import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThreatMonitor from "@/components/threat-monitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Activity, 
  Globe, 
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  Filter,
  RefreshCw
} from "lucide-react";
import type { SecurityIncident, ThreatIntelligence, SecurityEvent } from "@shared/schema";

interface ThreatEvent {
  id: string;
  type: "critical" | "medium" | "low";
  title: string;
  description: string;
  timestamp: Date;
  location: string;
  source: string;
  mitigated: boolean;
}

export default function LiveThreats() {
  // Fetch real security incidents
  const { data: securityIncidents, isLoading: incidentsLoading, refetch: refetchIncidents } = useQuery<SecurityIncident[]>({
    queryKey: ["/api/security-incidents"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch threat intelligence
  const { data: threatIntelligence, isLoading: threatLoading } = useQuery<ThreatIntelligence[]>({
    queryKey: ["/api/threat-intelligence"],
    refetchInterval: 60000, // Refresh every minute
  });

  // Fetch recent security events
  const { data: securityEvents, isLoading: eventsLoading } = useQuery<SecurityEvent[]>({
    queryKey: ["/api/security-events"],
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  // Convert security incidents to threat events format
  const threatEvents: ThreatEvent[] = securityIncidents?.map(incident => ({
    id: incident.id.toString(),
    type: incident.severity as "critical" | "medium" | "low",
    title: incident.title,
    description: incident.description,
    timestamp: new Date(incident.detectedAt),
    location: incident.source.includes("External") ? "Global" : "Internal Network",
    source: incident.source,
    mitigated: incident.status === "resolved"
  })) || [];

  const [isLive, setIsLive] = useState(true);

  // Auto-refresh data when live mode is enabled
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      refetchIncidents();
    }, 15000); // Refresh every 15 seconds

    return () => clearInterval(interval);
  }, [isLive, refetchIncidents]);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getThreatColor = (type: string) => {
    switch (type) {
      case "critical": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getThreatBg = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-500/10 border-red-500/20";
      case "medium": return "bg-yellow-500/10 border-yellow-500/20";
      case "low": return "bg-green-500/10 border-green-500/20";
      default: return "bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-red-500/10 text-red-500 border-red-500/20">
              <Activity className="w-3 h-3 mr-1" />
              Live Monitoring Active
            </Badge>
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              Live Threat Intelligence Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Real-time monitoring and analysis of AI-powered cyber threats across global networks. 
              Our advanced threat intelligence platform provides instant visibility into emerging 
              attack vectors and automated response capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      <ThreatMonitor />

      {/* Live Feed Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-2">Live Threat Feed</h2>
                <p className="text-muted-foreground">
                  Real-time detection and analysis of AI-powered cyber threats
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant={isLive ? "default" : "outline"}
                  onClick={() => setIsLive(!isLive)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                  {isLive ? "Live" : "Paused"}
                </Button>
                
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {threatEvents.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`${getThreatBg(threat.type)} border transition-all hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge 
                            variant={threat.type === "critical" ? "destructive" : "secondary"}
                            className={threat.type === "critical" ? "bg-red-500" : threat.type === "medium" ? "bg-yellow-500" : "bg-green-500"}
                          >
                            {threat.type.toUpperCase()}
                          </Badge>
                          
                          {threat.mitigated && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              <Shield className="w-3 h-3 mr-1" />
                              Mitigated
                            </Badge>
                          )}
                          
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {getTimeAgo(threat.timestamp)}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">{threat.title}</h3>
                        <p className="text-muted-foreground mb-3">{threat.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {threat.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {threat.source}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <AlertTriangle className={`w-6 h-6 ${getThreatColor(threat.type)}`} />
                        {!threat.mitigated && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Investigate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Analysis Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Advanced Threat Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered analysis engine provides deep insights into threat patterns, 
              attack vectors, and emerging risks in the cybersecurity landscape.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Threat Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI-Generated Phishing</span>
                      <span className="text-red-500 text-sm">+347%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">LLM Prompt Injection</span>
                      <span className="text-yellow-500 text-sm">+156%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Deepfake Attacks</span>
                      <span className="text-red-500 text-sm">+223%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Model Extraction</span>
                      <span className="text-yellow-500 text-sm">+89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">North America</span>
                      <span className="text-primary font-semibold">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Europe</span>
                      <span className="text-primary font-semibold">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Asia Pacific</span>
                      <span className="text-primary font-semibold">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other Regions</span>
                      <span className="text-primary font-semibold">7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Response Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Detection Time</span>
                      <span className="text-green-500 font-semibold">0.3s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mitigation Rate</span>
                      <span className="text-green-500 font-semibold">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">False Positives</span>
                      <span className="text-green-500 font-semibold">2.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">System Uptime</span>
                      <span className="text-green-500 font-semibold">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
