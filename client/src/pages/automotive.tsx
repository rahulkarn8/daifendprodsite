import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import OfferingsTabs from "@/components/offerings-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Zap, Shield, Target, Users } from "lucide-react";
import { Link } from "wouter";

export default function AutomotiveSecurity() {
  // --- Automotive-focused benefits ---
  const benefits = [
    {
      icon: Shield,
      title: "In-Vehicle Defense (ECU/Bus)",
      description:
        "LLM-powered anomaly detection across CAN/LIN/FlexRay/Ethernet with policy-based ECU isolation and safe-mode triggers."
    },
    {
      icon: Zap,
      title: "Real-Time V2X Integrity",
      description:
        "Detects GNSS spoofing, Sybil nodes, and MITM in C-V2X/DSRC; applies adaptive blocklists and reputation scoring."
    },
    {
      icon: Target,
      title: "OTA & Firmware Hardening",
      description:
        "Provenance checks, binary scanning, staged rollouts, and auto-rollback to prevent malicious or corrupted updates."
    },
    {
      icon: Users,
      title: "Fleet SOC Automation",
      description:
        "Autonomous response orchestration: revoke keys, quarantine vehicles, and notify ops — all with human-in-the-loop control."
    }
  ];

  // --- Automotive implementation phases ---
  const process = [
    {
      step: "01",
      title: "Vehicle & Fleet Assessment",
      description:
        "Threat modeling (ISO/SAE 21434), bus topology discovery, V2X surface mapping, and security posture baseline."
    },
    {
      step: "02",
      title: "In-Vehicle Agent & Gateway",
      description:
        "Deploy edge agents for telemetry, lightweight IDS on gateways, and secure channels to Daifend AutoDefend™."
    },
    {
      step: "03",
      title: "AutoDefend™ Correlation",
      description:
        "Cross-correlate bus traffic, V2X, OTA events, and cloud telemetry with LLM reasoning to classify intent and severity."
    },
    {
      step: "04",
      title: "Autonomous Response + SOC",
      description:
        "Orchestrate ECU isolation, OTA rollback, and fleet-wide guardrails; monitor dashboards and compliance artifacts."
    }
  ];

  // ---------- Dev-only sanity checks (non-breaking) ----------
  useEffect(() => {
    if (!(import.meta as any)?.env?.DEV) return;
    try {
      console.group("[Automotive Offerings Dev Tests]");
      console.assert(typeof Offerings === "function", "Component must export a function");
      console.assert(Array.isArray(benefits) && benefits.length === 4, "Benefits: expected 4 items");
      console.assert(Array.isArray(process) && process.length === 4, "Process: expected 4 steps");
      const ratingBoundsOk = [1, 5].every(Number.isFinite); // placeholder to show structure if you add ratings later
      console.assert(ratingBoundsOk, "Ratings bounds check placeholder");
      console.groupEnd();
    } catch (e) {
      console.warn("[Automotive Offerings Dev Tests] encountered an issue", e);
    }
  }, []);
  // ----------------------------------------------------------

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
              Automotive — AI-Native Cybersecurity
            </Badge>
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              Daifend AutoDefend™ for Connected & Autonomous Vehicles
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Secure software-defined vehicles with an LLM that understands vehicle context. Detect multi-stage attacks
              across ECUs, V2X, and OTA, then orchestrate safe, measurable responses in real time — fleet-wide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/contacts">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request Automotive Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/resources/automotive">
                <Button size="lg" variant="outline">
                  View Automotive Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Why Daifend for Automotive?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built for in-vehicle security, V2X integrity, and OTA resilience — all correlated by our
              automotive LLM for precise, explainable outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:bg-card/80 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">How We Secure Your Vehicles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A phased approach that fits OEMs, Tier-1s, and fleet operators — from engineering pilots to global rollouts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary/30 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Measurable Automotive Security ROI</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Reduce incident impact, speed up forensics, and prevent bad OTA rollouts — while maintaining compliance
                with UNECE WP.29 and ISO/SAE 21434.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Up to 85% faster incident response across fleets</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>90%+ improvement in cross-domain detection fidelity</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>70% fewer false positives with LLM contextualization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Policy evidence & audit trails ready for WP.29/21434</span>
                </div>
              </div>

              <Link href="/contacts">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Automotive ROI Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Average Fleet Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500">-85%</div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">+90%</div>
                      <p className="text-sm text-muted-foreground">Detection Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-500">-70%</div>
                      <p className="text-sm text-muted-foreground">False Positives</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-500">$2.3M</div>
                      <p className="text-sm text-muted-foreground">Avg. Annual Savings</p>
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
