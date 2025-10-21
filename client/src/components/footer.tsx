import { Shield, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const solutions = [
    { name: "AI Security Strategy", href: "/offerings#strategy" },
    { name: "Cybersecurity LLM", href: "/offerings#llm" },
    { name: "Self-Healing Systems", href: "/offerings#healing" },
    { name: "LLM Security", href: "/offerings#llmsec" },
  ];

  const research = [
    { name: "AI-Powered Attacks", href: "/research#attacks" },
    { name: "Quantum Cryptography", href: "/research#quantum" },
    { name: "AI Attack Simulations", href: "/research#simulations" },
    { name: "Agentic AI Security", href: "/research#agentic" },
  ];

  const company = [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contacts" },
  ];

  return (
    <footer className="bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Daifend</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Defending against AI-powered cyber attacks with intelligent, proactive security solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Research</h3>
            <ul className="space-y-2">
              {research.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 Daifend. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
