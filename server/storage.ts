import { 
  users, 
  securityIncidents, 
  aiModels, 
  threatIntelligence, 
  securityEvents, 
  aiEthicsAudits,
  type User, 
  type InsertUser,
  type SecurityIncident,
  type InsertSecurityIncident,
  type AIModel,
  type InsertAIModel,
  type ThreatIntelligence,
  type InsertThreatIntelligence,
  type SecurityEvent,
  type InsertSecurityEvent,
  type AIEthicsAudit,
  type InsertAIEthicsAudit
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, gte, lte, count } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Security incidents
  getSecurityIncidents(limit?: number): Promise<SecurityIncident[]>;
  getSecurityIncident(id: number): Promise<SecurityIncident | undefined>;
  createSecurityIncident(incident: InsertSecurityIncident): Promise<SecurityIncident>;
  updateSecurityIncident(id: number, updates: Partial<InsertSecurityIncident>): Promise<SecurityIncident | undefined>;
  
  // AI models
  getAIModels(): Promise<AIModel[]>;
  getAIModel(id: number): Promise<AIModel | undefined>;
  createAIModel(model: InsertAIModel): Promise<AIModel>;
  updateAIModel(id: number, updates: Partial<InsertAIModel>): Promise<AIModel | undefined>;
  
  // Threat intelligence
  getThreatIntelligence(activeOnly?: boolean): Promise<ThreatIntelligence[]>;
  createThreatIntelligence(threat: InsertThreatIntelligence): Promise<ThreatIntelligence>;
  
  // Security events
  getSecurityEvents(limit?: number): Promise<SecurityEvent[]>;
  createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent>;
  
  // AI ethics audits
  getAIEthicsAudits(modelId?: number): Promise<AIEthicsAudit[]>;
  createAIEthicsAudit(audit: InsertAIEthicsAudit): Promise<AIEthicsAudit>;
  
  // Analytics
  getSecurityDashboardStats(): Promise<{
    totalIncidents: number;
    openIncidents: number;
    criticalIncidents: number;
    averageResolutionTime: number;
    threatLevel: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Security incidents
  async getSecurityIncidents(limit: number = 50): Promise<SecurityIncident[]> {
    return await db
      .select()
      .from(securityIncidents)
      .orderBy(desc(securityIncidents.createdAt))
      .limit(limit);
  }

  async getSecurityIncident(id: number): Promise<SecurityIncident | undefined> {
    const [incident] = await db
      .select()
      .from(securityIncidents)
      .where(eq(securityIncidents.id, id));
    return incident || undefined;
  }

  async createSecurityIncident(incident: InsertSecurityIncident): Promise<SecurityIncident> {
    const [newIncident] = await db
      .insert(securityIncidents)
      .values(incident)
      .returning();
    return newIncident;
  }

  async updateSecurityIncident(id: number, updates: Partial<InsertSecurityIncident>): Promise<SecurityIncident | undefined> {
    const [updated] = await db
      .update(securityIncidents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(securityIncidents.id, id))
      .returning();
    return updated || undefined;
  }

  // AI models
  async getAIModels(): Promise<AIModel[]> {
    return await db
      .select()
      .from(aiModels)
      .orderBy(desc(aiModels.createdAt));
  }

  async getAIModel(id: number): Promise<AIModel | undefined> {
    const [model] = await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.id, id));
    return model || undefined;
  }

  async createAIModel(model: InsertAIModel): Promise<AIModel> {
    const [newModel] = await db
      .insert(aiModels)
      .values(model)
      .returning();
    return newModel;
  }

  async updateAIModel(id: number, updates: Partial<InsertAIModel>): Promise<AIModel | undefined> {
    const [updated] = await db
      .update(aiModels)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(aiModels.id, id))
      .returning();
    return updated || undefined;
  }

  // Threat intelligence
  async getThreatIntelligence(activeOnly: boolean = true): Promise<ThreatIntelligence[]> {
    const query = db.select().from(threatIntelligence);
    
    if (activeOnly) {
      query.where(eq(threatIntelligence.isActive, true));
    }
    
    return await query.orderBy(desc(threatIntelligence.createdAt));
  }

  async createThreatIntelligence(threat: InsertThreatIntelligence): Promise<ThreatIntelligence> {
    const [newThreat] = await db
      .insert(threatIntelligence)
      .values(threat)
      .returning();
    return newThreat;
  }

  // Security events
  async getSecurityEvents(limit: number = 100): Promise<SecurityEvent[]> {
    return await db
      .select()
      .from(securityEvents)
      .orderBy(desc(securityEvents.timestamp))
      .limit(limit);
  }

  async createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent> {
    const [newEvent] = await db
      .insert(securityEvents)
      .values(event)
      .returning();
    return newEvent;
  }

  // AI ethics audits
  async getAIEthicsAudits(modelId?: number): Promise<AIEthicsAudit[]> {
    const query = db.select().from(aiEthicsAudits);
    
    if (modelId) {
      query.where(eq(aiEthicsAudits.modelId, modelId));
    }
    
    return await query.orderBy(desc(aiEthicsAudits.auditDate));
  }

  async createAIEthicsAudit(audit: InsertAIEthicsAudit): Promise<AIEthicsAudit> {
    const [newAudit] = await db
      .insert(aiEthicsAudits)
      .values(audit)
      .returning();
    return newAudit;
  }

  // Analytics
  async getSecurityDashboardStats(): Promise<{
    totalIncidents: number;
    openIncidents: number;
    criticalIncidents: number;
    averageResolutionTime: number;
    threatLevel: number;
  }> {
    const [totalIncidents] = await db
      .select({ count: count() })
      .from(securityIncidents);

    const [openIncidents] = await db
      .select({ count: count() })
      .from(securityIncidents)
      .where(eq(securityIncidents.status, 'open'));

    const [criticalIncidents] = await db
      .select({ count: count() })
      .from(securityIncidents)
      .where(eq(securityIncidents.severity, 'critical'));

    // Calculate average threat level from recent incidents
    const recentIncidents = await db
      .select({ threatLevel: securityIncidents.threatLevel })
      .from(securityIncidents)
      .where(gte(securityIncidents.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))); // Last 24 hours

    const avgThreatLevel = recentIncidents.length > 0 
      ? recentIncidents.reduce((sum, incident) => sum + Number(incident.threatLevel), 0) / recentIncidents.length
      : 0;

    return {
      totalIncidents: totalIncidents.count,
      openIncidents: openIncidents.count,
      criticalIncidents: criticalIncidents.count,
      averageResolutionTime: 2.5, // Mock average in hours
      threatLevel: Math.round(avgThreatLevel)
    };
  }
}

export const storage = new DatabaseStorage();
