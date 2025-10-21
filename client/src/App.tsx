import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Offerings from "@/pages/offerings";
import Research from "@/pages/research";
import LiveThreats from "@/pages/live-threats";
import Resources from "@/pages/resources";
import Contacts from "@/pages/contacts";
import AutomotiveSecurity from "./pages/automotive";
import About from "./pages/about";
import Blog from "./pages/blog";
import Careers from "./pages/careers";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/offerings" component={Offerings} />
      <Route path="/research" component={Research} />
      <Route path="/automotive" component={AutomotiveSecurity} />
      <Route path="/live-threats" component={LiveThreats} />
      <Route path="/resources" component={Resources} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
