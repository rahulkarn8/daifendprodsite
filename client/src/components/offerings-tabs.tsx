import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Brain, 
  RefreshCw, 
  Shield, 
  Swords, 
  BarChart3,
  CheckCircle,
  Settings,
  Zap,
  Eye,
  Target,
  Scale
} from "lucide-react";

interface Offering {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  emoji: string;
  description: string;
  features: string[];
  outcomes: string[];
  color: string;
}

const offerings: Offering[] = [
  {
    id: "strategy",
    title: "AI Security Strategy",
    icon: Crown,
    emoji: "🔐",
    description: "We help organizations craft and execute a comprehensive AI security roadmap. This includes integrating AI into your cybersecurity fabric while ensuring it is safe, interpretable, and aligned with business goals.",
    features: [
      "AI risk identification and mitigation planning",
      "Secure AI model lifecycle governance", 
      "AI red-teaming and adversarial robustness assessments",
      "Integration strategy with legacy cybersecurity systems",
      "Regulatory and compliance alignment (NIST AI RMF, EU AI Act)"
    ],
    outcomes: [
      "AI-aware cyber posture",
      "Clear governance and controls", 
      "Secure-by-design AI development"
    ],
    color: "cyber-blue"
  },
  {
    id: "llm",
    title: "Cybersecurity LLM",
    icon: Brain,
    emoji: "🧠",
    description: "Our custom-trained cybersecurity LLMs are designed to detect, interpret, and respond to complex cyber threats in real time. These models act as intelligent assistants for your SOC and Threat Intelligence teams.",
    features: [
      "Context-aware incident summarization",
      "Threat report generation and translation",
      "Malware behavior pattern recognition", 
      "Autonomous playbook execution",
      "Natural language query interface to SIEM/XDR data"
    ],
    outcomes: [
      "Custom fine-tuned LLMs trained on threat intelligence, MITRE ATT&CK, and malware datasets"
    ],
    color: "cyber-purple"
  },
  {
    id: "healing",
    title: "Self-Healing Systems",
    icon: RefreshCw,
    emoji: "🔄", 
    description: "Move from reactive defense to autonomous resilience. Our self-healing systems detect anomalies, isolate threats, and automatically initiate corrective actions — all with minimal human intervention.",
    features: [
      "Real-time anomaly detection & root cause diagnosis",
      "Dynamic patch management and config rollback",
      "Behavioral policy enforcement",
      "AI-based risk scoring and response prioritization",
      "Integration with orchestration tools (SOAR, Kubernetes, cloud infra)"
    ],
    outcomes: [
      "Downtime reduction, threat containment, and continuous system hardening"
    ],
    color: "cyber-cyan"
  },
  {
    id: "llmsec",
    title: "LLM Security", 
    icon: Shield,
    emoji: "🛡️",
    description: "We secure the deployment and usage of large language models across enterprise environments. From prompt injection to data leakage — we help mitigate LLM-specific attack vectors.",
    features: [
      "Prompt injection and jailbreak protection",
      "Output sanitization and hallucination filters",
      "Guardrails for safe response generation",
      "Access control and session integrity", 
      "Fine-tuning with secure, domain-specific datasets"
    ],
    outcomes: [
      "Prevent LLM misuse, ensure trust, and maintain operational integrity of AI agents"
    ],
    color: "cyber-green"
  },
  {
    id: "defense",
    title: "AI Defense",
    icon: Swords,
    emoji: "⚔️",
    description: "Daifend equips you to defend against malicious AI — not just with AI. We build active defenses against generative attacks, AI-powered phishing, deepfakes, and automated adversaries.",
    features: [
      "Deepfake and synthetic content detection",
      "AI-based phishing defense", 
      "GenAI attack detection (LLM-generated malware/code)",
      "Adversarial input detection and defense",
      "Cognitive honeypots and deception systems"
    ],
    outcomes: [
      "Defense systems built to understand how AI attacks and respond like a human expert — faster"
    ],
    color: "cyber-red"
  },
  {
    id: "assessment",
    title: "Responsible AI Assessment",
    icon: BarChart3,
    emoji: "📊",
    description: "Security starts with responsibility. We help you evaluate your AI systems across ethical, legal, and technical dimensions to ensure responsible AI deployment.",
    features: [
      "Bias, fairness, and discrimination checks",
      "Explainability and transparency scoring",
      "Privacy risk (PII exposure, model inversion)",
      "Compliance with AI governance frameworks",
      "Documentation (Model cards, Datasheets for datasets)"
    ],
    outcomes: [
      "Trusted AI for security-critical systems",
      "Transparency for board-level and regulatory reporting"
    ],
    color: "cyber-yellow"
  }
];

export default function OfferingsTabs() {
  const [activeTab, setActiveTab] = useState("strategy");
  
  const activeOffering = offerings.find(o => o.id === activeTab) || offerings[0];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Securing the Future with Intelligent Cyber Defense</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Our suite of cutting-edge offerings is built to help enterprises navigate the evolving 
            threat landscape using AI-native, proactive, and intelligent security systems.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center mb-12 gap-3"
        >
          {offerings.map((offering) => (
            <motion.button
              key={offering.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(offering.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === offering.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary"
              }`}
            >
              <offering.icon className="w-4 h-4" />
              {offering.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">{activeOffering.emoji}</span>
                        <h3 className="text-3xl font-bold text-primary">
                          {activeOffering.title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {activeOffering.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {activeOffering.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {activeOffering.outcomes.map((outcome, index) => (
                          <Badge
                            key={outcome}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            ✔ {outcome}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                      >
                        {/* Placeholder for offering visualization */}
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/20">
                          <div className="text-center">
                            <activeOffering.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h4 className="text-xl font-semibold mb-2">{activeOffering.title}</h4>
                            <p className="text-muted-foreground">Interactive Demo Available</p>
                          </div>
                        </div>
                        
                        {/* Floating elements */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
                        >
                          <Zap className="w-4 h-4 text-primary" />
                        </motion.div>
                        
                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center"
                        >
                          <Eye className="w-3 h-3 text-cyan-400" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
