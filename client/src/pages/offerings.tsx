import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import OfferingsTabs from "@/components/offerings-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Zap, Shield, Target, Users } from "lucide-react";
import { Link } from "wouter";

export default function Offerings() {
  const benefits = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Military-grade encryption and security protocols protecting your most sensitive AI workloads."
    },
    {
      icon: Zap,
      title: "Real-Time Response",
      description: "Sub-second threat detection and automated response capabilities powered by our AI engines."
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "AI-driven threat intelligence that identifies and neutralizes sophisticated attack vectors."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 access to our team of cybersecurity researchers and AI security specialists."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Assessment & Strategy",
      description: "Comprehensive evaluation of your current AI security posture and threat landscape analysis."
    },
    {
      step: "02", 
      title: "Implementation",
      description: "Deployment of tailored AI security solutions with minimal disruption to operations."
    },
    {
      step: "03",
      title: "Monitoring & Optimization",
      description: "Continuous monitoring and optimization of security measures with real-time threat intelligence."
    },
    {
      step: "04",
      title: "Evolution & Scaling",
      description: "Adaptive security measures that evolve with emerging threats and scale with your business."
    }
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
              AI-Native Security Solutions
            </Badge>
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              Securing the Future with Intelligent Cyber Defense
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              At Daifend, our suite of cutting-edge offerings is built to help enterprises navigate the evolving 
              threat landscape using AI-native, proactive, and intelligent security systems. Our capabilities span 
              from foundational AI security strategy to fully autonomous self-healing cybersecurity systems.
            </p>
          </motion.div>
        </div>
      </section>

      <OfferingsTabs />

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
            <h2 className="text-4xl font-bold mb-6">Why Choose Daifend?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-first approach to cybersecurity delivers unparalleled protection against 
              both traditional and AI-powered threats.
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
            <h2 className="text-4xl font-bold mb-6">Our Implementation Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial assessment to full-scale deployment, we ensure a seamless integration 
              of AI security solutions into your existing infrastructure.
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
              <h2 className="text-4xl font-bold mb-6">Measurable Security ROI</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our clients see immediate and long-term returns on their AI security investments 
                through reduced breach risks, faster incident response, and improved compliance.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>85% reduction in security incident response time</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>90% improvement in threat detection accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>70% decrease in false positive alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% compliance with AI governance frameworks</span>
                </div>
              </div>
              <Link href="/contacts">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get ROI Analysis
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
                  <CardTitle>Average Customer Results</CardTitle>
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
                      <p className="text-sm text-muted-foreground">Avg. Cost Savings</p>
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
