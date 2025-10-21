import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle,
  Code,
  Shield,
  Brain,
  Zap
} from "lucide-react";

const codeBlocks = [
  {
    title: "AI Threat Detection",
    language: "python",
    lines: [
      "# Responsible AI Security Framework",
      "class EthicalThreatDetector:",
      "    def __init__(self, bias_threshold=0.1):",
      "        self.bias_checker = BiasDetector()",
      "        self.explainer = XAIEngine()",
      "        self.audit_log = ComplianceTracker()",
      "",
      "    def analyze_threat(self, data):",
      "        # Ensure ethical AI processing",
      "        bias_score = self.bias_checker.evaluate(data)",
      "        if bias_score > self.bias_threshold:",
      "            return self.fallback_analysis(data)",
      "",
      "        prediction = self.ai_model.predict(data)",
      "        explanation = self.explainer.explain(prediction)",
      "        self.audit_log.record(data, prediction, explanation)",
      "",
      "        return {",
      "            'threat_level': prediction.confidence,",
      "            'explanation': explanation.summary,",
      "            'bias_score': bias_score,",
      "            'audit_id': self.audit_log.last_entry_id",
      "        }"
    ],
    status: "secure"
  },
  {
    title: "Self-Healing Systems",
    language: "typescript",
    lines: [
      "// Autonomous Security Response",
      "interface SecurityIncident {",
      "  id: string;",
      "  severity: 'low' | 'medium' | 'high' | 'critical';",
      "  aiConfidence: number;",
      "  humanOversight: boolean;",
      "}",
      "",
      "class ResponsibleAutoHealer {",
      "  private ethicsEngine: EthicsValidator;",
      "  private humanApproval: HumanOversightSystem;",
      "",
      "  async healIncident(incident: SecurityIncident) {",
      "    // Check ethical constraints first",
      "    const ethicsCheck = await this.ethicsEngine.validate({",
      "      action: 'auto_heal',",
      "      severity: incident.severity,",
      "      confidence: incident.aiConfidence",
      "    });",
      "",
      "    if (!ethicsCheck.approved) {",
      "      return this.escalateToHuman(incident);",
      "    }",
      "",
      "    const healing = await this.executeHealing(incident);",
      "    await this.auditTrail.log(incident, healing);",
      "    return healing;",
      "  }",
      "}"
    ],
    status: "processing"
  },
  {
    title: "LLM Security Guard",
    language: "python",
    lines: [
      "# Secure LLM Deployment Framework",
      "class SecureLLMGuard:",
      "    def __init__(self):",
      "        self.content_filter = ResponsibleContentFilter()",
      "        self.privacy_guard = PrivacyProtector()",
      "        self.bias_monitor = ContinuousBiasMonitor()",
      "",
      "    async def secure_inference(self, prompt: str) -> dict:",
      "        # Pre-processing security checks",
      "        safety_check = self.content_filter.scan(prompt)",
      "        privacy_check = self.privacy_guard.scan(prompt)",
      "",
      "        if not (safety_check.safe and privacy_check.safe):",
      "            return self.generate_safe_rejection(prompt)",
      "",
      "        # Secure LLM inference with monitoring",
      "        response = await self.llm.generate(",
      "            prompt=prompt,",
      "            safety_filter=True,",
      "            bias_monitoring=True,",
      "            explanation_required=True",
      "        )",
      "",
      "        # Post-processing validation",
      "        bias_score = self.bias_monitor.check(response)",
      "        final_response = self.apply_safety_guardrails(response)",
      "",
      "        return {",
      "            'response': final_response,",
      "            'safety_score': safety_check.score,",
      "            'bias_score': bias_score,",
      "            'audit_trail': response.audit_id",
      "        }"
    ],
    status: "active"
  }
];

export default function CodeAnimation() {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [executionResults, setExecutionResults] = useState<string[]>([]);

  // Simulate typing animation
  useEffect(() => {
    if (!isPlaying) return;

    const currentCodeBlock = codeBlocks[currentBlock];
    const interval = setInterval(() => {
      if (currentLine < currentCodeBlock.lines.length) {
        setDisplayedCode(prev => [...prev, currentCodeBlock.lines[currentLine]]);
        setCurrentLine(prev => prev + 1);
        
        // Add simulated execution results for certain lines
        if (currentCodeBlock.lines[currentLine]?.includes('analyze_threat') ||
            currentCodeBlock.lines[currentLine]?.includes('healIncident') ||
            currentCodeBlock.lines[currentLine]?.includes('secure_inference')) {
          setTimeout(() => {
            setExecutionResults(prev => [...prev, `✓ ${currentCodeBlock.title} executed successfully`]);
          }, 500);
        }
      } else {
        // Move to next code block
        setTimeout(() => {
          setCurrentBlock(prev => (prev + 1) % codeBlocks.length);
          setCurrentLine(0);
          setDisplayedCode([]);
          setExecutionResults([]);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [currentBlock, currentLine, isPlaying]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure": return "text-green-400 bg-green-500/20 border-green-500/30";
      case "processing": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "active": return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure": return CheckCircle;
      case "processing": return Brain;
      case "active": return Zap;
      default: return Terminal;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-green-950/10 to-blue-950/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Responsible AI Security Code
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            See how our ethical AI security framework operates. Every line of code follows responsible AI principles, 
            ensuring transparency, accountability, and bias prevention in cybersecurity operations.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Control Panel */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"} Demo
              </Button>
              
              <Badge className={getStatusColor(codeBlocks[currentBlock].status)}>
                {(() => {
                  const StatusIcon = getStatusIcon(codeBlocks[currentBlock].status);
                  return <StatusIcon className="w-3 h-3 mr-1" />;
                })()}
                {codeBlocks[currentBlock].status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                <Code className="w-3 h-3 mr-1" />
                {codeBlocks[currentBlock].language.toUpperCase()}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Terminal className="w-3 h-3 mr-1" />
                Line {currentLine} / {codeBlocks[currentBlock].lines.length}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Code Editor */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/90 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-slate-300 font-medium">
                        {codeBlocks[currentBlock].title}
                      </span>
                    </div>
                    <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                      <Shield className="w-3 h-3 mr-1" />
                      Ethical AI Security
                    </Badge>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm">
                    <div className="space-y-1">
                      {displayedCode.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex"
                        >
                          <span className="text-slate-500 w-8 text-right mr-4">
                            {index + 1}
                          </span>
                          <span className={`${
                            line.startsWith('#') || line.startsWith('//') 
                              ? 'text-green-400' 
                              : line.includes('class ') || line.includes('interface ') || line.includes('def ') || line.includes('async ')
                              ? 'text-purple-400'
                              : line.includes('self.') || line.includes('this.')
                              ? 'text-cyan-400'
                              : line.includes("'") || line.includes('"')
                              ? 'text-yellow-400'
                              : 'text-slate-300'
                          }`}>
                            {line}
                          </span>
                        </motion.div>
                      ))}
                      
                      {/* Cursor */}
                      {isPlaying && (
                        <motion.div
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="inline-block w-2 h-5 bg-cyan-400"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Execution Panel */}
            <div className="space-y-6">
              {/* Execution Results */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-200 flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-green-400" />
                    Execution Output
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {executionResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-400 font-mono"
                      >
                        {result}
                      </motion.div>
                    ))}
                    {executionResults.length === 0 && (
                      <div className="text-slate-500 text-sm">
                        Waiting for execution...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Ethics Dashboard */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-200 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                    AI Ethics Monitor
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Bias Score:</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        0.03 (Low)
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Transparency:</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ High
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Accountability:</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ Enabled
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Human Oversight:</span>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        ✓ Required
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Block Navigation */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-200">Code Modules</h3>
                  <div className="space-y-2">
                    {codeBlocks.map((block, index) => (
                      <motion.button
                        key={block.title}
                        onClick={() => {
                          setCurrentBlock(index);
                          setCurrentLine(0);
                          setDisplayedCode([]);
                          setExecutionResults([]);
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          currentBlock === index
                            ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
                            : "bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium text-sm">{block.title}</div>
                        <div className="text-xs opacity-70">{block.language}</div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}