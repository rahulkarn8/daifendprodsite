import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Brain, Globe, Award, Users, Target, Sparkles, ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export default function About() {
  // --- content data ---
  const coreValues = [
    { icon: Shield, title: "Security First", description: "Safety-by-design for AI systems — proactive defenses and measurable resilience." },
    { icon: Brain,  title: "Responsible AI", description: "Explainable LLMs, data minimization, and continuous evaluations." },
    { icon: Target, title: "Precision & Impact", description: "Lower MTTR, fewer false positives, stronger compliance." },
    { icon: Users,  title: "Human-in-the-Loop", description: "Automation with expert oversight for mission-critical decisions." }
  ];

  const milestones = [
    { year: "2022", text: "Founded Daifend to secure next-gen AI and software-defined systems." },
    { year: "2023", text: "Launched AutoDefend™ — an LLM specialized for automotive cybersecurity." },
    { year: "2024", text: "Scaled global pilots with OEMs, Tier-1s, and fleet operators." },
    { year: "2025", text: "Expanded protections: V2X integrity, OTA hardening, and fleet SOC automation." }
  ];

  const stats = [
    { label: "AI Standards Contributed", value: "25+", icon: Award },
    { label: "Global Deployments",      value: "45+", icon: Globe },
    { label: "Threats Neutralized",     value: "2.1M+", icon: Shield },
    { label: "AI Models Secured",       value: "1,000+", icon: Brain }
  ];

  // --- dev sanity checks (non-breaking) ---
  useEffect(() => {
    if (!(import.meta as any)?.env?.DEV) return;
    console.group("[About Page Dev Tests]");
    console.assert(typeof About === "function", "Component must export a function");
    console.assert(coreValues.length > 0, "Core values present");
    console.assert(milestones.length > 0, "Milestones present");
    console.groupEnd();
  }, []);

  // --- JSON-LD Structured Data ---
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Daifend",
    "url": "https://daifend.ai",
    "logo": "https://daifend.ai/logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/daifend",
      "https://twitter.com/daifend" // remove if not used
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@daifend.com",
      "telephone": "+1-614-216-7090",
      "areaServed": "Worldwide",
      "availableLanguage": ["en"]
    }]
  };

  const officesJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Daifend — Houston Office",
      "image": "https://daifend.ai/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "920 W 20th Street",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "postalCode": "77008",
        "addressCountry": "US"
      },
      "telephone": "+1-614-216-7090",
      "url": "https://daifend.ai"
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Daifend — Delhi NCR Office",
      "image": "https://daifend.ai/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "DLF Cyber City, Tower B",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122002",
        "addressCountry": "IN"
      },
      "telephone": "+91-9818900182",
      "url": "https://daifend.ai"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* SEO */}
      <Helmet>
        <title>About Daifend | AI-Native Cybersecurity</title>
        <meta
          name="description"
          content="Daifend builds AI-native security for connected, autonomous, and software-defined systems. Learn about our mission, principles, milestones, and global presence."
        />
        <meta name="keywords" content="Daifend, AI Security, Automotive Cybersecurity, V2X Security, OTA Security, LLM Security" />
        <link rel="canonical" href="https://daifend.ai/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Daifend | AI-Native Cybersecurity" />
        <meta property="og:description" content="Our mission is to make intelligent infrastructure safe with explainable, measurable, resilient defenses." />
        <meta property="og:url" content="https://daifend.ai/about" />
        <meta property="og:image" content="https://daifend.ai/images/og/daifend-about.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Daifend | AI-Native Cybersecurity" />
        <meta name="twitter:description" content="Learn about Daifend's mission, values, and team." />
        <meta name="twitter:image" content="https://daifend.ai/images/og/daifend-about.jpg" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(officesJsonLd[0])}</script>
        <script type="application/ld+json">{JSON.stringify(officesJsonLd[1])}</script>
      </Helmet>

      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20" />
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

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-slate-200 pt-28 pb-12"
        >
          <Sparkles className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Daifend</h1>
          <p className="text-lg md:text-xl text-slate-400">
            We build AI-native security for connected, autonomous, and software-defined systems. Our mission is to make
            intelligent infrastructure safe — with defenses that are explainable, measurable, and resilient.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-6 text-center">
              <s.icon className="w-7 h-7 mx-auto mb-3 text-cyan-400" />
              <div className="text-3xl font-bold text-slate-100">{s.value}</div>
              <div className="text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-100 text-center mb-8"
          >
            Our Principles
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {coreValues.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">{v.title}</h3>
                  <p className="text-slate-400 mt-1">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-100 text-center mb-8"
          >
            Milestones
          </motion.h2>
          <div className="relative border-l border-slate-700/50 ml-3 md:ml-6">
            {milestones.map((m) => (
              <div key={m.year} className="pl-6 md:pl-8 pb-8 relative">
                <div className="w-3 h-3 rounded-full bg-cyan-400 absolute -left-1.5 top-2" />
                <div className="text-cyan-300 text-sm font-semibold">{m.year}</div>
                <div className="text-slate-200">{m.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Offices quick info */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-100 text-center mb-8"
          >
            Global Presence
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">Houston, USA</span>
              </div>
              <p className="text-slate-400">920 W 20th Street, Houston, TX 77008</p>
              <p className="text-slate-400 flex items-center gap-2 mt-2"><Phone className="w-4 h-4 text-cyan-400" /> +1 (614) 216-7090</p>
              <p className="text-slate-400 flex items-center gap-2"><Mail className="w-4 h-4 text-cyan-400" /> info@daifend.com</p>
            </div>

            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">Delhi NCR, India</span>
              </div>
              <p className="text-slate-400">DLF Cyber City, Tower B, Gurugram, Delhi NCR</p>
              <p className="text-slate-400 flex items-center gap-2 mt-2"><Phone className="w-4 h-4 text-cyan-400" /> +91 9818900182</p>
              <p className="text-slate-400 flex items-center gap-2"><Mail className="w-4 h-4 text-cyan-400" /> support@daifend.com</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pb-20">
          <a href="/contacts">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              Talk to Our Team <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
