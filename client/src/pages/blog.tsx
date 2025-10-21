import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Newspaper, Tag, Calendar, User, ArrowRight, Sparkles, Search, MapPin
} from "lucide-react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Replace with your router link component if needed
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">
    {children}
  </a>
);

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO string (YYYY-MM-DD)
  author: string;
  readingTime: string; // e.g., "6 min"
  tags: string[];
  cover?: string;
};

const POSTS: Post[] = [
  {
    slug: "/blog/llm-automotive-soc",
    title: "Building an LLM-Driven Automotive SOC",
    excerpt:
      "How AutoDefend correlates CAN, V2X, and OTA signals to detect multi-stage attacks — with explainable actions and human-in-the-loop.",
    date: "2025-07-10",
    author: "Daifend Research",
    readingTime: "7 min",
    tags: ["Automotive", "LLM", "Detection", "Fleet"],
    cover: "/images/blog/llm-soc.jpg",
  },
  {
    slug: "/blog/v2x-integrity-gnss-spoofing",
    title: "V2X Integrity: Catching GNSS Spoofing in the Wild",
    excerpt:
      "We break down a real-world spoofing scenario and show the signals and heuristics our models use to distinguish noise from intent.",
    date: "2025-06-02",
    author: "Daifend Labs",
    readingTime: "6 min",
    tags: ["V2X", "GNSS", "Detection"],
    cover: "/images/blog/v2x-gnss.jpg",
  },
  {
    slug: "/blog/ota-hardening-rolling-back",
    title: "OTA Hardening: From Provenance to Safe Rollback",
    excerpt:
      "Designing update pipelines that resist tampering while staying operable at fleet scale, with policy evidence for WP.29/21434.",
    date: "2025-04-18",
    author: "Daifend Platform",
    readingTime: "5 min",
    tags: ["OTA", "Compliance", "Automotive"],
    cover: "/images/blog/ota.jpg",
  },
  {
    slug: "/blog/can-bus-threat-modeling",
    title: "Threat Modeling Modern CAN Topologies",
    excerpt:
      "Evolving architectures bring new choke points and correlations — here’s a pragmatic approach to modeling risk.",
    date: "2025-03-05",
    author: "Security Engineering",
    readingTime: "8 min",
    tags: ["Automotive", "CAN", "Threat Modeling"],
  },
];

export default function Blog() {
  // --- SEO fallback (works even if HelmetProvider isn’t wired) ---
  useEffect(() => {
    try {
      document.title = "Daifend Blog | AI-Native Cybersecurity Insights";
    } catch {}
  }, []);

  // --- UI state ---
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    POSTS.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return POSTS.filter((p) => {
      const matchesQ =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesQ && matchesTag;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, activeTag]);

  // --- Dev sanity checks (non-breaking) ---
  useEffect(() => {
    if (!(import.meta as any)?.env?.DEV) return;
    try {
      console.group("[Blog Page Dev Tests]");
      console.assert(typeof Blog === "function", "Component must export a function");
      console.assert(Array.isArray(POSTS) && POSTS.length >= 1, "At least one post");
      console.assert(allTags.length >= 1, "Tags derived");
      console.groupEnd();
    } catch (e) {
      console.warn("[Blog Page Dev Tests] issue:", e);
    }
  }, [allTags.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* SEO (use HelmetProvider at app root for full SSR/CSR harmony) */}
      <Helmet>
        <title>Daifend Blog | AI-Native Cybersecurity Insights</title>
        <meta
          name="description"
          content="Deep dives on AI-native security for connected, autonomous, and software-defined systems — from V2X integrity to OTA hardening."
        />
        <link rel="canonical" href="https://daifend.ai/blog" />
        <meta property="og:title" content="Daifend Blog" />
        <meta property="og:description" content="Research, guides, and case studies on AI-native cybersecurity." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://daifend.ai/blog" />
        <meta property="og:image" content="https://daifend.ai/images/og/daifend-blog.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Daifend Blog</h1>
          <p className="text-lg md:text-xl text-slate-400">
            Research, guides, and case studies on AI-native cybersecurity for connected and autonomous systems.
          </p>
        </motion.div>

        {/* Search + Tags */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts (title, excerpt, tags)…"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={activeTag ? "outline" : "default"}
                className={activeTag ? "" : "bg-cyan-600"}
                onClick={() => setActiveTag(null)}
              >
                All
              </Badge>
              {allTags.map((t) => (
                <Badge
                  key={t}
                  variant={activeTag === t ? "default" : "outline"}
                  className={activeTag === t ? "bg-cyan-600" : ""}
                  onClick={() => setActiveTag(t === activeTag ? null : t)}
                >
                  <Tag className="w-3.5 h-3.5 mr-1" />
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-16"
        >
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm overflow-hidden flex flex-col"
            >
              {p.cover && (
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </time>
                  <span>•</span>
                  <User className="w-4 h-4" />
                  <span>{p.author}</span>
                  <span>•</span>
                  <Newspaper className="w-4 h-4" />
                  <span>{p.readingTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-100 mb-2">{p.title}</h3>
                <p className="text-slate-400 flex-1">{p.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6">
                  <A href={p.slug}>
                    Read more <ArrowRight className="w-4 h-4" />
                  </A>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* CTA / Subscribe */}
        <div className="max-w-3xl mx-auto text-center pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">Stay in the loop</h2>
          <p className="text-slate-400 mb-6">
            Get new posts on AI-native security, automotive, and V2X delivered to your inbox.
          </p>
          <A href="/contacts">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              Contact our team <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </A>
        </div>
      </div>
    </section>
  );
}
