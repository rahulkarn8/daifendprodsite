import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Briefcase, MapPin, Building2, Clock, Sparkles, ArrowRight, Users, Shield, Cpu, Globe
} from "lucide-react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Job = {
  id: string;
  title: string;
  team: string;          // e.g., "Security Research", "Platform"
  type: "Full-time" | "Contract" | "Internship" | "Remote";
  location: string;      // "Houston, TX" | "Delhi NCR" | "Remote"
  description: string;
  tags: string[];
  applyUrl: string;
};

const JOBS: Job[] = [
  {
    id: "sr-llm-security-researcher",
    title: "Senior LLM Security Researcher",
    team: "Security Research",
    type: "Full-time",
    location: "Houston, TX",
    description:
      "Lead research on LLM safety and abuse prevention. Design evaluations for jailbreaks, prompt-injection, and data poisoning in automotive contexts.",
    tags: ["LLM", "Red Teaming", "Evaluations", "Automotive"],
    applyUrl: "/careers/apply?role=sr-llm-security-researcher",
  },
  {
    id: "platform-engineer-edge",
    title: "Platform Engineer (Edge/Gateway)",
    team: "Platform",
    type: "Full-time",
    location: "Delhi NCR",
    description:
      "Build low-latency, fault-tolerant agents for CAN/FlexRay/Ethernet gateways with secure telemetry and OTA-safe rollouts.",
    tags: ["Edge", "CAN", "OTA", "Rust/Go"],
    applyUrl: "/careers/apply?role=platform-engineer-edge",
  },
  {
    id: "security-analyst-fleet-soc",
    title: "Security Analyst — Fleet SOC",
    team: "Operations",
    type: "Full-time",
    location: "Delhi NCR",
    description:
      "Monitor fleet-wide signals, triage incidents, and coordinate automated response playbooks with human-in-the-loop oversight.",
    tags: ["SOC", "Detection", "Playbooks", "V2X"],
    applyUrl: "/careers/apply?role=security-analyst-fleet-soc",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    team: "Product",
    type: "Remote",
    location: "Remote",
    description:
      "Design and ship performant dashboards and visualizations for threat investigations and compliance evidence.",
    tags: ["React", "Typescript", "Data Viz"],
    applyUrl: "/careers/apply?role=frontend-engineer",
  },
];

export default function Careers() {
  // --- SEO fallback (renders even if HelmetProvider missing) ---
  useEffect(() => {
    try {
      document.title = "Careers at Daifend | Build AI-Native Security";
    } catch {}
  }, []);

  // --- Filters ---
  const [q, setQ] = useState("");
  const [team, setTeam] = useState<string>("All");
  const [loc, setLoc] = useState<string>("All");
  const [type, setType] = useState<string>("All");

  const teams = useMemo(() => ["All", ...Array.from(new Set(JOBS.map(j => j.team)))], []);
  const locations = useMemo(() => ["All", ...Array.from(new Set(JOBS.map(j => j.location)))], []);
  const types = useMemo(() => ["All", ...Array.from(new Set(JOBS.map(j => j.type)))], []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return JOBS.filter(j => {
      const matchesQ =
        !query ||
        j.title.toLowerCase().includes(query) ||
        j.description.toLowerCase().includes(query) ||
        j.tags.some(t => t.toLowerCase().includes(query));
      const matchesTeam = team === "All" || j.team === team;
      const matchesLoc = loc === "All" || j.location === loc;
      const matchesType = type === "All" || j.type === type;
      return matchesQ && matchesTeam && matchesLoc && matchesType;
    });
  }, [q, team, loc, type]);

  // --- Dev sanity checks (non-breaking) ---
  useEffect(() => {
    if (!(import.meta as any)?.env?.DEV) return;
    try {
      console.group("[Careers Page Dev Tests]");
      console.assert(typeof Careers === "function", "Component must export a function");
      console.assert(Array.isArray(JOBS) && JOBS.length >= 1, "At least one job");
      console.assert(teams.length >= 1 && locations.length >= 1 && types.length >= 1, "Filters populated");
      console.groupEnd();
    } catch (e) {
      console.warn("[Careers Page Dev Tests] issue:", e);
    }
  }, [teams.length, locations.length, types.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* SEO */}
      <Helmet>
        <title>Careers at Daifend | Build AI-Native Security</title>
        <meta
          name="description"
          content="Join Daifend to build AI-native cybersecurity for connected, autonomous, and software-defined systems. Explore roles in research, platform, product, and operations."
        />
        <link rel="canonical" href="https://daifend.ai/careers" />
        <meta property="og:title" content="Careers at Daifend" />
        <meta property="og:description" content="Help secure intelligent infrastructure. View open roles and apply." />
        <meta property="og:image" content="https://daifend.ai/images/og/daifend-careers.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
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
      <div className="container mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-slate-200 pt-28 pb-10"
        >
          <Sparkles className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Careers at Daifend</h1>
          <p className="text-lg md:text-xl text-slate-400">
            Help us build AI-native security that protects connected and autonomous systems worldwide.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-slate-400">
            <Users className="w-4 h-4" /> Inclusive culture
            <Shield className="w-4 h-4 ml-4" /> Security-first
            <Cpu className="w-4 h-4 ml-4" /> Deep tech
            <Globe className="w-4 h-4 ml-4" /> Global impact
          </div>
        </motion.div>

        {/* Filters */}
        <div className="max-w-5xl mx-auto mb-8 grid gap-4 md:grid-cols-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search roles..."
            className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Jobs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-16"
        >
          {filtered.map((j) => (
            <article
              key={j.id}
              className="group rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-slate-100">{j.title}</h3>
                <Badge className="bg-primary/20 text-primary">{j.team}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                <span className="inline-flex items-center gap-1">
                  <Building2 className="w-4 h-4" /> {j.team}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {j.type}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {j.location}
                </span>
              </div>

              <p className="text-slate-400 flex-1">{j.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {j.tags.map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href="/contacts"
                  className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200"
                >
                  Apply now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">Don’t see a perfect fit?</h2>
          <p className="text-slate-400 mb-6">
            We’re always meeting exceptional builders. Send your profile and we’ll reach out when there’s a match.
          </p>
          <a href="/contacts">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              Open application <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
