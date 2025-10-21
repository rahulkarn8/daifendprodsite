import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Atom, 
  FlaskConical, 
  Bot, 
  Download, 
  ExternalLink, 
  Calendar,
  Users,
  BookOpen,
  Award
} from "lucide-react";

export default function Research() {
  const researchAreas = [
    {
      id: "attacks",
      icon: AlertTriangle,
      title: "AI-Powered Attacks",
      description: "With generative AI becoming weaponized, threat actors are building sophisticated AI-powered attack tools. Daifend studies these offensive capabilities to predict and neutralize them before they reach your enterprise.",
      areas: [
        "LLM-generated phishing & social engineering",
        "Autonomous malware and zero-day discovery using AI",
        "AI-augmented ransomware and botnets",
        "Code generation & obfuscation using LLMs",
        "Automated penetration testing bots"
      ],
      color: "red",
      impact: "We simulate, dissect, and defend against attacks powered by the very AI systems businesses are adopting — turning AI from a risk into a shield."
    },
    {
      id: "quantum",
      icon: Atom,
      title: "Quantum Cryptography",
      description: "Quantum computing threatens to break today's cryptographic standards. Daifend's research explores both the risks and the new cryptographic frontiers to future-proof security.",
      areas: [
        "Post-quantum cryptographic algorithm implementation",
        "Quantum key distribution (QKD) protocols", 
        "Risk modeling of hybrid (quantum + classical) systems",
        "Quantum-resilient VPNs, storage, and identity systems",
        "NIST PQC algorithm benchmarking and transition planning"
      ],
      color: "blue",
      impact: "To prepare organizations for the quantum threat — not after it arrives, but before it materializes."
    },
    {
      id: "simulations",
      icon: FlaskConical,
      title: "AI Attack Simulations",
      description: "We build AI-driven simulation environments to test how cyber defenses respond to dynamic, intelligent threat agents — replicating real-world breaches in safe, controlled labs.",
      areas: [
        "Autonomous red team agents using reinforcement learning",
        "Simulated insider threats and compromised LLMs",
        "Defensive posture benchmarking with synthetic threats",
        "Attack path prediction using graph neural networks",
        "Integration with SOC runbooks and real attack datasets"
      ],
      color: "purple",
      impact: "Insights to harden infrastructure and prepare blue teams for AI-era threats."
    },
    {
      id: "agentic",
      icon: Bot,
      title: "Agentic AI Security",
      description: "Multi-agent AI systems (like AutoGPT, open agents, or enterprise copilots) pose novel security challenges due to their autonomy and emergent behaviors. Daifend leads in researching how to secure agent-based architectures.",
      areas: [
        "Autonomous agent governance and control",
        "Detection of rogue agent behavior",
        "Agent-to-agent communication threat modeling",
        "Secure task delegation in agent swarms",
        "Zero-trust policies for agent orchestration"
      ],
      color: "cyan",
      impact: "Agents that act on their own — whether in a business workflow or a malware framework — need a new paradigm of security. We're building that paradigm."
    }
  ];

  const publications = [
    {
      title: "Adversarial AI in Cybersecurity: A Comprehensive Survey",
      venue: "IEEE Security & Privacy",
      year: "2024",
      type: "Journal Article",
      citations: 234,
      impact: "High"
    },
    {
      title: "Quantum-Resistant Security Architectures for Enterprise AI",
      venue: "NDSS 2024",
      year: "2024", 
      type: "Conference Paper",
      citations: 89,
      impact: "High"
    },
    {
      title: "Self-Healing Systems: Autonomous Cyber Resilience",
      venue: "ACM CCS 2024",
      year: "2024",
      type: "Conference Paper", 
      citations: 156,
      impact: "High"
    },
    {
      title: "LLM Security: Defending Against Prompt Injection Attacks",
      venue: "USENIX Security 2024",
      year: "2024",
      type: "Conference Paper",
      citations: 312,
      impact: "Very High"
    },
    {
      title: "Agentic AI Threat Modeling and Mitigation Strategies",
      venue: "IEEE S&P 2024",
      year: "2024",
      type: "Conference Paper",
      citations: 178,
      impact: "High"
    },
    {
      title: "Post-Quantum Cryptography Implementation Guide",
      venue: "Crypto 2024",
      year: "2024",
      type: "Conference Paper",
      citations: 267,
      impact: "Very High"
    }
  ];

  const stats = [
    { label: "Research Papers Published", value: "150+", icon: BookOpen },
    { label: "Researchers & PhDs", value: "45+", icon: Users },
    { label: "Patents Filed", value: "23", icon: Award },
    { label: "Conference Presentations", value: "80+", icon: Calendar },
  ];

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
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Cutting-Edge Research
            </Badge>
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              Pioneering the Future of AI-Driven Cybersecurity
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              At Daifend, our research is focused on anticipating the next generation of threats and building 
              the technological foundations for secure, resilient, and trustworthy digital systems. We explore 
              the intersection of advanced AI, cryptography, and cyber defense to stay ahead of the evolving 
              adversarial landscape.
            </p>
          </motion.div>

          {/* Research Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Core Research Areas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our interdisciplinary research teams focus on four critical areas that will define 
              the future of cybersecurity in the AI era.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:bg-card/80 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-${area.color}-500/20 rounded-lg flex items-center justify-center`}>
                        <area.icon className={`w-6 h-6 text-${area.color}-500`} />
                      </div>
                      <div>
                        <span className="text-2xl mr-2">{area.emoji}</span>
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Research Focus Areas:</h4>
                      <ul className="space-y-2">
                        {area.areas.map((focus, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className={`w-1.5 h-1.5 bg-${area.color}-500 rounded-full mt-2 flex-shrink-0`} />
                            {focus}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`bg-${area.color}-500/10 border border-${area.color}-500/20 rounded-lg p-4`}>
                      <p className={`text-${area.color}-400 font-medium text-sm`}>
                        <strong>Why it matters:</strong> {area.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Latest Research Publications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our research team regularly publishes in top-tier security conferences and journals, 
              contributing to the global knowledge base of AI cybersecurity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:bg-card/80 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge 
                        variant={paper.impact === "Very High" ? "default" : "secondary"}
                        className={paper.impact === "Very High" ? "bg-primary" : ""}
                      >
                        {paper.impact} Impact
                      </Badge>
                      <span className="text-sm text-muted-foreground">{paper.year}</span>
                    </div>
                    
                    <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {paper.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Venue:</strong> {paper.venue}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Type:</strong> {paper.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Citations:</strong> {paper.citations}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        DOI
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              View All Publications
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Research Collaboration</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We actively collaborate with leading universities, government agencies, and industry partners 
                to advance the state of AI cybersecurity research. Our open approach to research ensures 
                that critical security innovations reach the broader community.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Partnership with 15+ leading universities worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Active collaboration with government cybersecurity agencies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Open-source contributions to security research community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Regular speaking engagements at top security conferences</span>
                </div>
              </div>
              
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join Our Research Program
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Research Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">2,400+</div>
                      <p className="text-sm text-muted-foreground">Total Citations</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500">15</div>
                      <p className="text-sm text-muted-foreground">University Partners</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-500">8</div>
                      <p className="text-sm text-muted-foreground">Government Agencies</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-500">95%</div>
                      <p className="text-sm text-muted-foreground">Acceptance Rate</p>
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
