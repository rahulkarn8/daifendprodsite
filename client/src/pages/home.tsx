import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import OfferingsTabs from "@/components/offerings-tabs";
import ThreatMonitor from "@/components/threat-monitor";
import InteractiveDashboard from "@/components/interactive-dashboard";
import AIVisualization from "@/components/ai-visualization";
import CodeAnimation from "@/components/code-animation";
import MatrixRain from "@/components/matrix-rain";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Phone, ArrowRight, Star, Users, Award, Globe, Shield, Brain, Zap, Lock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const stats = [
    { label: "AI Standards Contributed", value: "25+", icon: Award, color: "cyan" },
    { label: "Threats Neutralized", value: "2.1M+", icon: Shield, color: "green" },
    { label: "Global Deployments", value: "45+", icon: Globe, color: "blue" },
    { label: "AI Models Secured", value: "1,000+", icon: Brain, color: "purple" },
  ];

  const testimonials = [
    {
      quote: "Daifend's commitment to responsible AI standards while delivering cutting-edge security is exactly what our industry needs.",
      author: "Dr. Sarah Chen",
      role: "Chief AI Ethics Officer",
      rating: 5
    },
    {
      quote: "Their self-healing systems reduced our incident response time by 85% while maintaining full compliance with AI governance frameworks.",
      author: "Michael Rodriguez", 
      role: "Security Director",
      rating: 5
    },
    {
      quote: "The combination of advanced threat detection and ethical AI practices gives us confidence in our digital transformation.",
      author: "Dr. Emily Watson",
      role: "Chief Technology Officer",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative">
      <MatrixRain />
      <Navbar />
      <HeroSection />
      
      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Leading the AI Security Revolution
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Through cutting-edge research and responsible AI development, we're setting new standards for cybersecurity.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-${stat.color}-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-${stat.color}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
                <div className={`text-4xl font-bold mb-2 text-${stat.color}-400`}>{stat.value}</div>
                <p className="text-slate-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <InteractiveDashboard />
      <AIVisualization />
      <CodeAnimation />
      <OfferingsTabs />
      <ThreatMonitor />

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-purple-950/20 to-blue-950/20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Trusted by Innovation Leaders
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Security professionals who prioritize both cutting-edge protection and responsible AI development 
              choose Daifend for their critical infrastructure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-8 leading-relaxed text-slate-300 group-hover:text-slate-200 transition-colors">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t border-slate-700/50 pt-6">
                      <div className="font-semibold text-slate-200">{testimonial.author}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-purple-900/30 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated background elements */}
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl right-0"
            animate={{
              x: [0, -80, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ready to Pioneer AI Security?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join the forefront of responsible AI security. Experience cutting-edge protection that doesn't compromise 
              on ethical standards. See how Daifend's solutions can transform your cybersecurity posture.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contacts">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl shadow-cyan-500/25 group relative overflow-hidden">
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
               
                <Button className="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10 text-lg">Schedule Live Demo</span>
                <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                
                </Button>
                </Link>
                
                
                
              {/*<Button size="lg" variant="outline" className="border-2 border-slate-500/50 text-slate-300 hover:bg-slate-500/10 hover:border-slate-400 group">
                <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                <span className="text-lg">Contact Security Team</span>
              </Button>*/}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
