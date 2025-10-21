import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-full blur-3xl"
        style={{ left: "10%", top: "20%" }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-cyber-cyan/15 to-cyber-green/15 rounded-full blur-2xl"
        style={{ right: "10%", bottom: "20%" }}
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
