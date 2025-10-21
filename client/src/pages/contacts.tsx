import { motion } from "framer-motion";
import { Mail, Send, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Navbar />
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
         <br></br>
        <br></br>
         <br></br>
          <br></br>

        {/* Animated Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ left: "10%", top: "10%" }}
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-full blur-3xl"
          style={{ right: "5%", bottom: "10%" }}
          animate={{ x: [0, -80, 0], y: [0, 40, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center text-slate-200"
        >
      <br></br>
      <br></br>
          <Mail className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-slate-400 mb-8">
            Have questions, ideas, or want to learn more about Daifend's AI-powered cybersecurity solutions?  
            We'd love to hear from you.
          </p>

          {/* Contact Details */}
          <div className="grid md:grid-cols-2 gap-8 text-left mb-10">
            {/* Emails */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                info@daifend.com
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                support@daifend.com
              </p>
            </div>

            {/* Phone Numbers */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cyan-400" />
                +1 (614) 216-7090 (Houston)
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cyan-400" />
                +91 9818900182 (Delhi)
              </p>
            </div>

            {/* Office Locations */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Houston Office</h3>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                920 W 20th Street, Houston, TX 77008, USA
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Delhi Office</h3>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                DLF Cyber City, Tower B, Gurugram, Delhi NCR, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>

            {status && <p className="text-sm">{status}</p>}

            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25"
            >
              <Send className="w-5 h-5 mr-2" /> Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
