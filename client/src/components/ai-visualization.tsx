import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Shield, 
  Zap, 
  Eye, 
  Target, 
  Lock,
  Activity,
  Cpu,
  Network,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Play,
  Pause
} from "lucide-react";

interface AINode {
  id: string;
  x: number;
  y: number;
  z: number;
  type: "input" | "processing" | "output" | "security";
  value: number;
  connections: string[];
  status: "active" | "processing" | "secure" | "threat";
}

export default function AIVisualization() {
  const [nodes, setNodes] = useState<AINode[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [threatLevel, setThreatLevel] = useState(0);

  // Initialize AI network nodes
  useEffect(() => {
    const initialNodes: AINode[] = [
      // Input layer
      { id: "input-1", x: 10, y: 20, z: 0, type: "input", value: 0.8, connections: ["proc-1", "proc-2"], status: "active" },
      { id: "input-2", x: 10, y: 40, z: 0, type: "input", value: 0.6, connections: ["proc-1", "proc-3"], status: "active" },
      { id: "input-3", x: 10, y: 60, z: 0, type: "input", value: 0.9, connections: ["proc-2", "proc-3"], status: "active" },
      { id: "input-4", x: 10, y: 80, z: 0, type: "input", value: 0.4, connections: ["proc-1"], status: "active" },
      
      // Processing layer
      { id: "proc-1", x: 35, y: 25, z: 20, type: "processing", value: 0.7, connections: ["sec-1", "output-1"], status: "processing" },
      { id: "proc-2", x: 35, y: 50, z: 20, type: "processing", value: 0.5, connections: ["sec-2", "output-2"], status: "processing" },
      { id: "proc-3", x: 35, y: 75, z: 20, type: "processing", value: 0.8, connections: ["sec-1", "output-1"], status: "processing" },
      
      // Security layer
      { id: "sec-1", x: 60, y: 35, z: 10, type: "security", value: 0.9, connections: ["output-1"], status: "secure" },
      { id: "sec-2", x: 60, y: 65, z: 10, type: "security", value: 0.95, connections: ["output-2"], status: "secure" },
      
      // Output layer
      { id: "output-1", x: 85, y: 40, z: 0, type: "output", value: 0.85, connections: [], status: "active" },
      { id: "output-2", x: 85, y: 60, z: 0, type: "output", value: 0.78, connections: [], status: "active" },
    ];
    setNodes(initialNodes);
  }, []);

  // Animate nodes and simulate AI processing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        value: Math.max(0.1, Math.min(1, node.value + (Math.random() - 0.5) * 0.1)),
        status: node.type === "security" && Math.random() > 0.9 ? "threat" : 
                node.type === "security" ? "secure" :
                node.type === "processing" ? "processing" : "active"
      })));

      setThreatLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.7) * 5)));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "input": return Activity;
      case "processing": return Brain;
      case "security": return Shield;
      case "output": return Target;
      default: return Cpu;
    }
  };

  const getNodeColor = (type: string, status: string) => {
    if (status === "threat") return "from-red-500 to-red-700 border-red-400 shadow-red-500/50";
    if (status === "secure") return "from-green-500 to-green-700 border-green-400 shadow-green-500/50";
    if (status === "processing") return "from-yellow-500 to-yellow-700 border-yellow-400 shadow-yellow-500/50";
    
    switch (type) {
      case "input": return "from-blue-500 to-blue-700 border-blue-400 shadow-blue-500/50";
      case "processing": return "from-purple-500 to-purple-700 border-purple-400 shadow-purple-500/50";
      case "security": return "from-green-500 to-green-700 border-green-400 shadow-green-500/50";
      case "output": return "from-cyan-500 to-cyan-700 border-cyan-400 shadow-cyan-500/50";
      default: return "from-gray-500 to-gray-700 border-gray-400 shadow-gray-500/50";
    }
  };

  const renderConnections = () => {
    return nodes.flatMap(node => 
      node.connections.map(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return null;
        
        const opacity = node.value * target.value;
        
        return (
          <motion.line
            key={`${node.id}-${targetId}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${target.x}%`}
            y2={`${target.y}%`}
            stroke={`rgba(59, 130, 246, ${opacity})`}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: isPlaying ? [0, 1, 0] : 1,
              strokeDasharray: isPlaying ? "5 5" : "none"
            }}
            transition={{ 
              duration: 2, 
              repeat: isPlaying ? Infinity : 0,
              ease: "linear"
            }}
          />
        );
      })
    ).filter(Boolean);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-purple-950/20 to-blue-950/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            AI Security Architecture
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Witness our responsible AI security framework in action. Our multi-layered approach ensures 
            ethical AI governance while maintaining the highest levels of threat protection.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Control Panel */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"} Simulation
              </Button>
              
              <Badge className={`${threatLevel > 50 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}`}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                Threat Level: {threatLevel.toFixed(0)}%
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Activity className="w-3 h-3 mr-1" />
                {nodes.filter(n => n.status === "active" || n.status === "processing").length} Active Nodes
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Shield className="w-3 h-3 mr-1" />
                {nodes.filter(n => n.status === "secure").length} Secured
              </Badge>
            </div>
          </div>

          {/* 3D Network Visualization */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-xl border border-slate-700/50 overflow-hidden">
                {/* Background grid */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }}
                />
                
                {/* Network connections */}
                <svg className="absolute inset-0 w-full h-full">
                  {renderConnections()}
                </svg>
                
                {/* AI Nodes */}
                {nodes.map((node, index) => {
                  const Icon = getNodeIcon(node.type);
                  const size = 12 + node.value * 8; // Dynamic sizing based on value
                  const zOffset = node.z * 0.5; // Simple 3D effect
                  
                  return (
                    <motion.div
                      key={node.id}
                      className={`absolute cursor-pointer`}
                      style={{ 
                        left: `${node.x}%`, 
                        top: `${node.y}%`,
                        transform: `translate(-50%, -50%) translateZ(${zOffset}px)`,
                        width: `${size}px`,
                        height: `${size}px`
                      }}
                      animate={{
                        scale: selectedNode === node.id ? 1.3 : 1,
                        rotateY: isPlaying ? [0, 360] : 0,
                      }}
                      transition={{
                        scale: { duration: 0.2 },
                        rotateY: { duration: 4, repeat: Infinity, ease: "linear" }
                      }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${getNodeColor(node.type, node.status)} rounded-full border-2 flex items-center justify-center backdrop-blur-sm shadow-lg`}>
                        <Icon className="w-1/2 h-1/2 text-white" />
                      </div>
                      
                      {/* Value indicator */}
                      <motion.div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-cyan-400"
                        animate={{ opacity: selectedNode === node.id ? 1 : 0 }}
                      >
                        {(node.value * 100).toFixed(0)}%
                      </motion.div>
                    </motion.div>
                  );
                })}
                
                {/* Layer labels */}
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Activity className="w-3 h-3 mr-1" />
                    Input Layer
                  </Badge>
                </div>
                
                <div className="absolute top-4 left-1/3 space-y-2">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Processing
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-1/3 space-y-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Security Layer
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 space-y-2">
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    <Target className="w-3 h-3 mr-1" />
                    Output Layer
                  </Badge>
                </div>
                
                {/* Node details panel */}
                <AnimatePresence>
                  {selectedNode && (
                    <motion.div
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 w-64"
                    >
                      {(() => {
                        const node = nodes.find(n => n.id === selectedNode);
                        if (!node) return null;
                        
                        return (
                          <div>
                            <h4 className="font-semibold text-slate-200 mb-2 capitalize">
                              {node.type} Node
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Status:</span>
                                <span className={`font-medium ${
                                  node.status === "secure" ? "text-green-400" :
                                  node.status === "threat" ? "text-red-400" :
                                  node.status === "processing" ? "text-yellow-400" :
                                  "text-blue-400"
                                }`}>
                                  {node.status}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Activity:</span>
                                <span className="text-cyan-400">{(node.value * 100).toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Connections:</span>
                                <span className="text-purple-400">{node.connections.length}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Ethics & Standards Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <Card className="bg-slate-900/30 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Ethical AI Processing</h3>
                <p className="text-slate-400 text-sm">
                  Every AI decision follows responsible AI principles with full transparency and accountability
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/30 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Bias Prevention</h3>
                <p className="text-slate-400 text-sm">
                  Multi-layered bias detection and mitigation ensures fair and equitable AI security decisions
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/30 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Full Auditability</h3>
                <p className="text-slate-400 text-sm">
                  Complete decision tracking and explainable AI ensures regulatory compliance and trust
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}