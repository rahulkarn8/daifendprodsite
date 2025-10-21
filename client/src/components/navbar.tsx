import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/img/daifend_logo.png";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Offerings", href: "/offerings" },
    { name: "Research", href: "/research" },
    { name: "Automotive", href: "/automotive" },
    { name: "Live Threats", href: "/live-threats" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contacts" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img src={logo} alt="Daifend" style={{height: '50px'}} />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  whileHover={{ color: "hsl(217, 91%, 60%)" }}
                  className={`text-muted-foreground hover:text-primary transition-colors cursor-pointer ${
                    location === item.href ? "text-primary" : ""
                  }`}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* <Button className="hidden md:block bg-primary hover:bg-primary/90">
              Book Demo
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-border"
          >
            <div className="flex flex-col space-y-4 mt-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`text-muted-foreground hover:text-primary transition-colors cursor-pointer ${
                      location === item.href ? "text-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              {/* <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                Book Demo
              </Button> */}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
