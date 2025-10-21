import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Globe,
  Zap,
  Lock,
  Eye,
  Target,
  Cpu
} from "lucide-react";
import type { SecurityIncident, AIModel, SecurityEvent } from "@shared/schema";

interface DataNode {
  id: string;
  x: number;
  y: number;
  type: "threat" | "defense" | "ai" | "data";
  status: "active" | "blocked" | "processing";
  connections: string[];
}

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [nodes, setNodes] = useState<DataNode[]>([]);

  // Fetch real data from APIs
  const { data: securityIncidents } = useQuery<SecurityIncident[]>({
    queryKey: ["/api/security-incidents"],
    refetchInterval: 30000,
  });

  const { data: aiModels } = useQuery<AIModel[]>({
    queryKey: ["/api/ai-models"],
    refetchInterval: 60000,
  });

  const { data: securityEvents } = useQuery<SecurityEvent[]>({
    queryKey: ["/api/security-events"],
    refetchInterval: 15000,
  });

  // Calculate real threat statistics
  const threats = {
    blocked: securityIncidents?.filter(i => i.status === "resolved").length || 0,
    processing: securityIncidents?.filter(i => i.status === "investigating").length || 0,
    detected: securityIncidents?.filter(i => i.status === "open").length || 0
  };

  const tabs = [
    { 
      name: "AI Defense Engine", 
      icon: Brain,
      description: "Real-time AI threat analysis and mitigation"
    },
    { 
      name: "Global Threat Map", 
      icon: Globe,
      description: "Worldwide cybersecurity monitoring"
    },
    { 
      name: "Response Analytics", 
      icon: TrendingUp,
      description: "Performance metrics and insights"
    }
  ];

  // Initialize nodes based on AI models
  useEffect(() => {
    if (!aiModels || aiModels.length === 0) return;

    const initialNodes: DataNode[] = [
      // AI models as nodes
      ...aiModels.slice(0, 3).map((model, index) => ({
        id: `ai-${model.id}`,
        x: 20 + index * 30,
        y: 25 + index * 5,
        type: "ai" as const,
        status: model.status === "active" ? "active" as const : "processing" as const,
        connections: [`def-${index + 1}`]
      })),
      // Defense nodes
      { id: "def-1", x: 45, y: 60, type: "defense" as const, status: "active" as const, connections: ["threat-1"] },
      { id: "def-2", x: 70, y: 55, type: "defense" as const, status: "active" as const, connections: ["threat-2"] },
      // Threat nodes based on real incidents
      ...securityIncidents?.slice(0, 2).map((incident, index) => ({
        id: `threat-${incident.id}`,
        x: 25 + index * 35,
        y: 80,
        type: "threat" as const,
        status: incident.status === "resolved" ? "blocked" as const : "processing" as const,
        connections: []
      })) || [],
      { id: "data-1", x: 40, y: 20, type: "data" as const, status: "processing" as const, connections: ["ai-1"] },
    ];
    setNodes(initialNodes);
  }, [aiModels, securityIncidents]);

  // Animate nodes with subtle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        x: Math.max(5, Math.min(95, node.x + (Math.random() - 0.5) * 1)),
        y: Math.max(5, Math.min(95, node.y + (Math.random() - 0.5) * 1))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "ai": return Brain;
      case "defense": return Shield;
      case "threat": return AlertTriangle;
      case "data": return Cpu;
      default: return Activity;
    }
  };

  const getNodeColor = (type: string, status: string) => {
    if (status === "blocked") return "text-red-500 bg-red-500/20 border-red-500/30";
    if (status === "processing") return "text-yellow-500 bg-yellow-500/20 border-yellow-500/30";
    
    switch (type) {
      case "ai": return "text-purple-500 bg-purple-500/20 border-purple-500/30";
      case "defense": return "text-green-500 bg-green-500/20 border-green-500/30";
      case "threat": return "text-red-500 bg-red-500/20 border-red-500/30";
      case "data": return "text-blue-500 bg-blue-500/20 border-blue-500/30";
      default: return "text-gray-500 bg-gray-500/20 border-gray-500/30";
    }
  };

  const renderConnections = () => {
    return nodes.flatMap(node => 
      node.connections.map(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return null;
        
        return (
          <motion.line
            key={`${node.id}-${targetId}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${target.x}%`}
            y2={`${target.y}%`}
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
      })
    ).filter(Boolean);
  };

  const TabContent = ({ index }: { index: number }) => {
    switch (index) {
      case 0:
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-slate-900/50 to-blue-900/30 rounded-xl border border-slate-700/50 overflow-hidden">
            {/* Network Visualization */}
            <svg className="absolute inset-0 w-full h-full">
              {renderConnections()}
            </svg>
            
            {/* Nodes */}
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              return (
                <motion.div
                  key={node.id}
                  className={`absolute w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-sm ${getNodeColor(node.type, node.status)}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              );
            })}
            
            {/* Status overlay */}
            <div className="absolute top-4 left-4 space-y-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Activity className="w-3 h-3 mr-1" />
                AI Engine Active
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Processing: {threats.processing} threats
              </Badge>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-slate-900/50 to-green-900/30 rounded-xl border border-slate-700/50 overflow-hidden">
            {/* World Map Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-32 bg-slate-800/50 rounded-lg border border-slate-600/50">
                {/* Threat indicators */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-red-500 rounded-full"
                    style={{
                      left: `${10 + i * 7}%`,
                      top: `${20 + Math.sin(i) * 40}%`
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                  Global Threat Detection
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 space-y-2">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <Globe className="w-3 h-3 mr-1" />
                {threats.detected} threats detected
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                {threats.blocked} blocked
              </Badge>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-xl border border-slate-700/50 overflow-hidden p-6">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    {(threats.blocked / Math.max(threats.detected, 1) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-slate-400">Block Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">0.3s</div>
                  <div className="text-sm text-slate-400">Avg Response</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {threats.processing}
                  </div>
                  <div className="text-sm text-slate-400">Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">99.7%</div>
                  <div className="text-sm text-slate-400">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Animated chart bars */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between h-16">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 bg-gradient-to-t from-cyan-500/50 to-purple-500/50 rounded-t"
                  animate={{
                    height: [`${20 + Math.random() * 40}%`, `${30 + Math.random() * 50}%`]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Live AI Security Operations
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Experience our AI-powered cybersecurity platform in action with real-time threat detection, 
            analysis, and automated response capabilities.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 rounded-xl font-medium transition-all flex items-center gap-3 ${
                  activeTab === index
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 border border-slate-600/50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{tab.name}</div>
                  <div className="text-xs opacity-80">{tab.description}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <TabContent index={activeTab} />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}