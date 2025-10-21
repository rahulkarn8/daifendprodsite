import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSecurityIncidentSchema, 
  insertAiModelSchema, 
  insertThreatIntelligenceSchema,
  insertSecurityEventSchema,
  insertAiEthicsAuditSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Security Incidents
  app.get("/api/security-incidents", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const incidents = await storage.getSecurityIncidents(limit);
      res.json(incidents);
    } catch (error) {
      console.error("Error fetching security incidents:", error);
      res.status(500).json({ error: "Failed to fetch security incidents" });
    }
  });

  app.get("/api/security-incidents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const incident = await storage.getSecurityIncident(id);
      if (!incident) {
        return res.status(404).json({ error: "Security incident not found" });
      }
      res.json(incident);
    } catch (error) {
      console.error("Error fetching security incident:", error);
      res.status(500).json({ error: "Failed to fetch security incident" });
    }
  });

  app.post("/api/security-incidents", async (req, res) => {
    try {
      const validatedData = insertSecurityIncidentSchema.parse(req.body);
      const incident = await storage.createSecurityIncident(validatedData);
      res.status(201).json(incident);
    } catch (error) {
      console.error("Error creating security incident:", error);
      res.status(400).json({ error: "Failed to create security incident" });
    }
  });

  // AI Models
  app.get("/api/ai-models", async (req, res) => {
    try {
      const models = await storage.getAIModels();
      res.json(models);
    } catch (error) {
      console.error("Error fetching AI models:", error);
      res.status(500).json({ error: "Failed to fetch AI models" });
    }
  });

  // Threat Intelligence
  app.get("/api/threat-intelligence", async (req, res) => {
    try {
      const activeOnly = req.query.active !== 'false';
      const threats = await storage.getThreatIntelligence(activeOnly);
      res.json(threats);
    } catch (error) {
      console.error("Error fetching threat intelligence:", error);
      res.status(500).json({ error: "Failed to fetch threat intelligence" });
    }
  });

  // Security Events
  app.get("/api/security-events", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const events = await storage.getSecurityEvents(limit);
      res.json(events);
    } catch (error) {
      console.error("Error fetching security events:", error);
      res.status(500).json({ error: "Failed to fetch security events" });
    }
  });

  // AI Ethics Audits
  app.get("/api/ai-ethics-audits", async (req, res) => {
    try {
      const modelId = req.query.modelId ? parseInt(req.query.modelId as string) : undefined;
      const audits = await storage.getAIEthicsAudits(modelId);
      res.json(audits);
    } catch (error) {
      console.error("Error fetching AI ethics audits:", error);
      res.status(500).json({ error: "Failed to fetch AI ethics audits" });
    }
  });

  // Dashboard Analytics
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getSecurityDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
