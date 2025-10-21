import { motion } from "framer-motion";
import { Play, Shield, ChevronDown, Cpu, Globe, Zap, Target, Lock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function HeroSection() {
  const floatingElements = [
    { icon: Shield, position: { top: "20%", left: "8%" }, delay: 0, color: "cyan", size: "lg" },
    { icon: Brain, position: { top: "30%", right: "12%" }, delay: 1.5, color: "purple", size: "md" },
    { icon: Lock, position: { bottom: "25%", left: "15%" }, delay: 3, color: "blue", size: "lg" },
    { icon: Zap, position: { top: "15%", right: "25%" }, delay: 4.5, color: "green", size: "sm" },
    { icon: Target, position: { bottom: "35%", right: "20%" }, delay: 6, color: "red", size: "md" },
    { icon: Cpu, position: { top: "45%", left: "5%" }, delay: 7.5, color: "yellow", size: "sm" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ left: "10%", top: "10%" }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-full blur-3xl"
          style={{ right: "5%", bottom: "10%" }}
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <br />
             <br />
             <br />
             <br />
             <br />
             <br />
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm">
              <Globe className="w-4 h-4 mr-2" />
              Leading Responsible AI Standards Development
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-6xl mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Advanced Defense Against
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Emerging AI Threat Vectors
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-5xl mx-auto leading-relaxed"
          >
            Pioneering Defense Against Next-Generation AI Threat Architectures through Research-Driven, Evidence-Based Cybersecurity Solutions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          ><Link href="/contacts">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25 group relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
             
              {/* <Play className="w-5 h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform" /> */}
              <span className="relative z-10">Start Defense</span>
            </Button>
            </Link>
            
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-slate-400 mb-6">
              Pioneering ethical AI security standards • Trusted by Fortune 500 enterprises
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {["AI GOVERNANCE", "RESPONSIBLE AI", "ENTERPRISE SECURITY", "GOVERNMENT DEFENSE"].map((label, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="h-10 px-4 bg-slate-800/50 rounded-lg flex items-center justify-center text-xs font-medium text-slate-300 border border-slate-700/50 backdrop-blur-sm"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Advanced Floating Elements */}
      {floatingElements.map((element, index) => {
        const sizes = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-20 h-20" };
        const iconSizes = { sm: "w-5 h-5", md: "w-7 h-7", lg: "w-9 h-9" };
        
        return (
          <motion.div
            key={index}
            className="absolute"
            style={element.position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -30, -30, 0],
              rotate: [0, 180, 360, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            <div className={`${sizes[element.size]} bg-gradient-to-br from-${element.color}-400/20 to-${element.color}-600/20 rounded-full flex items-center justify-center backdrop-blur-md border border-${element.color}-400/30 shadow-lg shadow-${element.color}-500/20`}>
              <element.icon className={`${iconSizes[element.size]} text-${element.color}-400`} />
            </div>
          </motion.div>
        );
      })}
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
