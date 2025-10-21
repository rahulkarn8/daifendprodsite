import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Sparkles, Send, User, Mail, Phone, MapPin, Briefcase, Link2 } from "lucide-react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

// configure your backend endpoint here
const APPLY_ENDPOINT = "/careers/apply";

function useQueryParam(name: string) {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setValue(params.get(name));
    } catch {
      setValue(null);
    }
  }, [name]);
  return value;
}

export default function CareerApply() {
  // --- SEO fallback (works even if HelmetProvider isn’t wired) ---
  useEffect(() => {
    try {
      document.title = "Apply | Careers at Daifend";
    } catch {}
  }, []);

  // prefill from query string
  const role = useQueryParam("role") || "Open Application";

  // form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [employmentType, setEmploymentType] = useState<"Full-time" | "Contract" | "Internship" | "Remote" | "">("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // honeypot (bots fill this, humans don't)
  const [website, setWebsite] = useState(""); // DO NOT RENDER value; if filled, we silently ignore the submit

  const canSubmit = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return (
      !loading &&
      fullName.trim().length >= 2 &&
      emailOk &&
      coverLetter.trim().length >= 30 // basic signal
    );
  }, [loading, fullName, email, coverLetter]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) {
      // bot detected; pretend success
      setStatus("✅ Application received.");
      return;
    }
    if (!canSubmit) {
      setStatus("❌ Please complete the required fields.");
      return;
    }
    setLoading(true);
    setStatus("Sending…");

    try {
      const res = await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          fullName,
          email,
          phone,
          location,
          portfolio,
          resumeUrl,
          coverLetter,
          employmentType,
          source: "careers-apply-page",
          ts: new Date().toISOString(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("✅ Application submitted successfully!");
        setFullName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setPortfolio("");
        setResumeUrl("");
        setCoverLetter("");
        setEmploymentType("");
      } else {
        setStatus(data.error || "❌ Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* SEO */}
      <Helmet>
        <title>Apply | Careers at Daifend</title>
        <meta
          name="description"
          content="Apply to Daifend — help build AI-native cybersecurity for connected and autonomous systems."
        />
        <link rel="canonical" href="https://daifend.ai/careers/apply" />
        <meta property="og:title" content="Apply | Careers at Daifend" />
        <meta property="og:description" content="Submit your application to join Daifend." />
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
          className="max-w-3xl mx-auto text-center text-slate-200 pt-28 pb-10"
        >
          <Sparkles className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Apply to Daifend</h1>
          <p className="text-lg md:text-xl text-slate-400">
            You’re applying for: <span className="text-cyan-300 font-semibold">{role}</span>
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5 pb-20">
          {/* honeypot (hidden) */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                placeholder="Full Name*"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Current Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="url"
                placeholder="LinkedIn / Portfolio URL"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as any)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Employment Type (optional)</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <input
            type="url"
            placeholder="Resume URL (GDrive/Dropbox/ATS)"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <textarea
            rows={8}
            required
            placeholder="Cover Letter* — Share 2–3 highlights relevant to this role (min 30 chars)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {status && (
            <p className={`text-sm ${status.startsWith("✅") ? "text-green-400" : status.startsWith("❌") ? "text-red-400" : "text-slate-400"}`}>
              {status}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 disabled:opacity-60"
          >
            <Send className="w-5 h-5 mr-2" />
            {loading ? "Submitting…" : "Submit Application"}
          </Button>
        </form>
      </div>
    </section>
  );
}
