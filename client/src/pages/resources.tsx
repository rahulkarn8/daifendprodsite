import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Search, 
  Calendar,
  Clock,
  Users,
  PlayCircle,
  ExternalLink,
  Filter,
  Tag
} from "lucide-react";

export default function Resources() {
  const resourceCategories = [
    { name: "All", count: 45, active: true },
    { name: "Whitepapers", count: 12, active: false },
    { name: "Webinars", count: 8, active: false },
    { name: "Case Studies", count: 10, active: false },
    { name: "Research Papers", count: 15, active: false },
  ];

  const featuredResources = [
    {
      type: "whitepaper",
      title: "The Complete Guide to AI Security in Enterprise Environments",
      description: "A comprehensive 50-page guide covering everything from AI threat landscape to implementation strategies for enterprise security teams.",
      downloadCount: "2.3K",
      publishDate: "Dec 2024",
      readTime: "25 min",
      category: "AI Security",
      featured: true
    },
    {
      type: "webinar",
      title: "Defending Against AI-Powered Phishing: Live Demo & Best Practices",
      description: "Join our security experts for a live demonstration of AI-powered phishing attacks and learn proven defense strategies.",
      viewCount: "1.8K",
      publishDate: "Nov 2024", 
      duration: "45 min",
      category: "Threat Defense",
      featured: true
    },
    {
      type: "case-study",
      title: "Enterprise Banking: 95% Reduction in AI Security Incidents",
      description: "How a Fortune 500 bank implemented Daifend's AI security solutions to dramatically reduce security incidents.",
      downloadCount: "1.2K",
      publishDate: "Oct 2024",
      readTime: "15 min",
      category: "Financial Services",
      featured: true
    }
  ];

  const allResources = [
    {
      type: "research",
      title: "Adversarial Machine Learning: Threats and Countermeasures",
      description: "Academic research paper examining the latest adversarial ML techniques and defensive strategies.",
      downloads: "3.1K",
      date: "Dec 2024",
      time: "20 min",
      category: "Research"
    },
    {
      type: "whitepaper",
      title: "LLM Security Framework: Implementation Guide",
      description: "Step-by-step guide for implementing robust security measures for large language models in production.",
      downloads: "2.7K", 
      date: "Nov 2024",
      time: "18 min",
      category: "Implementation"
    },
    {
      type: "webinar",
      title: "Quantum-Safe Cryptography: Preparing for the Post-Quantum Era",
      description: "Expert discussion on quantum computing threats and how to prepare your cryptographic infrastructure.",
      views: "1.9K",
      date: "Nov 2024",
      duration: "60 min",
      category: "Cryptography"
    },
    {
      type: "case-study",
      title: "Healthcare AI Security: Protecting Patient Data in ML Systems",
      description: "Real-world implementation of AI security measures in a major healthcare system.",
      downloads: "1.5K",
      date: "Oct 2024", 
      time: "12 min",
      category: "Healthcare"
    },
    {
      type: "whitepaper",
      title: "Self-Healing Cybersecurity Systems: The Future of Autonomous Defense",
      description: "Explore how AI-powered self-healing systems can revolutionize cybersecurity operations.",
      downloads: "2.1K",
      date: "Oct 2024",
      time: "22 min", 
      category: "Autonomous Security"
    },
    {
      type: "research",
      title: "Agentic AI Security: Securing Multi-Agent Systems",
      description: "Comprehensive analysis of security challenges in multi-agent AI architectures.",
      downloads: "1.8K",
      date: "Sep 2024",
      time: "16 min",
      category: "Research"
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "whitepaper": return FileText;
      case "webinar": return Video;
      case "case-study": return BookOpen;
      case "research": return BookOpen;
      default: return FileText;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case "whitepaper": return "text-blue-500";
      case "webinar": return "text-purple-500";
      case "case-study": return "text-green-500";
      case "research": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Knowledge Center
            </Badge>
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              AI Security Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Access our comprehensive library of AI security resources, including whitepapers, research, 
              case studies, and expert insights to help you stay ahead of emerging threats and implement 
              best practices in AI cybersecurity.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search resources..." 
                className="pl-12 pr-4 py-3 bg-card border-border text-lg"
              />
            </div>
          </motion.div>

          {/* Resource Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {resourceCategories.map((category) => (
              <Button
                key={category.name}
                variant={category.active ? "default" : "outline"}
                className={`${category.active ? "bg-primary" : "hover:bg-primary/10"} flex items-center gap-2`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Featured Resources</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our most popular and impactful resources for AI security professionals
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {featuredResources.map((resource, index) => {
              const Icon = getResourceIcon(resource.type);
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:bg-card/80 transition-colors group border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${getResourceColor(resource.type)}`} />
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {resource.publishDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.readTime || resource.duration}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Download className="w-3 h-3" />
                          {resource.downloadCount || resource.viewCount}
                        </div>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 group">
                        {resource.type === "webinar" ? (
                          <>
                            <PlayCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Watch Now
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Download
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-2">All Resources</h2>
                <p className="text-muted-foreground">
                  Browse our complete collection of AI security resources
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {allResources.map((resource, index) => {
              const Icon = getResourceIcon(resource.type);
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:bg-card/80 transition-colors group">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 bg-${resource.type === 'whitepaper' ? 'blue' : resource.type === 'webinar' ? 'purple' : resource.type === 'case-study' ? 'green' : 'orange'}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${getResourceColor(resource.type)}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {resource.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {resource.time || resource.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {resource.downloads || resource.views}
                              </div>
                            </div>
                            
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            {resource.type === "webinar" ? (
                              <PlayCircle className="w-3 h-3" />
                            ) : (
                              <Download className="w-3 h-3" />
                            )}
                          </Button>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              Load More Resources
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest AI security resources, research findings, and threat intelligence 
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Join 10,000+ security professionals. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
