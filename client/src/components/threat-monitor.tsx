import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Eye, Activity, Globe, Zap } from "lucide-react";

interface ThreatData {
  critical: number;
  medium: number;
  mitigated: number;
  detectionRate: number;
  responseTime: number;
  uptime: number;
}

export default function ThreatMonitor() {
  const [threatData, setThreatData] = useState<ThreatData>({
    critical: 1247,
    medium: 3829,
    mitigated: 12456,
    detectionRate: 89,
    responseTime: 0.3,
    uptime: 99.7
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatData(prev => ({
        ...prev,
        critical: prev.critical + Math.floor(Math.random() * 3) - 1,
        medium: prev.medium + Math.floor(Math.random() * 5) - 2,
        mitigated: prev.mitigated + Math.floor(Math.random() * 10),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const threats = [
    {
      title: "Critical Threats",
      value: threatData.critical.toLocaleString(),
      description: "Active AI-powered attacks detected",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      icon: AlertTriangle,
      pulse: true
    },
    {
      title: "Medium Threats", 
      value: threatData.medium.toLocaleString(),
      description: "Suspicious AI activities monitored",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10", 
      borderColor: "border-yellow-500/20",
      icon: Eye,
      pulse: true
    },
    {
      title: "Threats Mitigated",
      value: threatData.mitigated.toLocaleString(),
      description: "Attacks neutralized this month",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20", 
      icon: Shield,
      pulse: false
    }
  ];

  const metrics = [
    {
      label: "Phishing Detection Rate",
      value: `${threatData.detectionRate}%`,
      color: "text-primary"
    },
    {
      label: "Average Response Time", 
      value: `${threatData.responseTime}s`,
      color: "text-purple-400"
    },
    {
      label: "Continuous Monitoring",
      value: "24/7",
      color: "text-cyan-400"
    },
    {
      label: "Uptime Guarantee",
      value: `${threatData.uptime}%`, 
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Live Threat Intelligence</h2>
          <p className="text-xl text-muted-foreground">
            Real-time monitoring and analysis of AI-powered cyber threats
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`${threat.bgColor} border ${threat.borderColor} relative overflow-hidden`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-3 ${threat.pulse ? 'animate-pulse' : ''}`} 
                         style={{ backgroundColor: threat.color.replace('text-', '') }} />
                    <h3 className={`text-lg font-semibold ${threat.color}`}>
                      {threat.title}
                    </h3>
                    <threat.icon className={`w-5 h-5 ml-auto ${threat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${threat.color} mb-2`}>
                    {threat.value}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {threat.description}
                  </p>
                  
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, ${threat.color.replace('text-', '')} 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 100%, ${threat.color.replace('text-', '')} 0%, transparent 50%)`,
                        `radial-gradient(circle at 0% 0%, ${threat.color.replace('text-', '')} 0%, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Global Threat Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Global Threat Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Map placeholder with threat visualization */}
              <div className="relative w-full h-80 bg-gradient-to-br from-background via-card to-background rounded-lg border border-border overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                    <h4 className="text-xl font-semibold mb-2">Real-Time Threat Visualization</h4>
                    <p className="text-muted-foreground">Global cybersecurity monitoring active</p>
                  </div>
                </div>
                
                {/* Animated threat indicators */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-red-500 rounded-full"
                    style={{
                      left: `${15 + i * 10}%`,
                      top: `${20 + Math.sin(i) * 40}%`
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                      {metric.value}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
