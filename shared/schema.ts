import { pgTable, text, integer, timestamp, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: text().notNull().default("user"),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow()
});

// Security incidents table
export const securityIncidents = pgTable("security_incidents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  severity: text().notNull(), // low, medium, high, critical
  status: text().notNull().default("open"), // open, investigating, resolved
  threatLevel: numeric("threat_level", { precision: 5, scale: 2 }).notNull(),
  source: text().notNull(),
  detectedAt: timestamp().notNull(),
  resolvedAt: timestamp(),
  assignedTo: integer(),
  createdBy: integer().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow()
});

// AI model monitoring
export const aiModels = pgTable("ai_models", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  version: text().notNull(),
  type: text().notNull(), // threat_detection, bias_monitor, content_filter
  status: text().notNull().default("active"), // active, inactive, training
  accuracy: numeric("accuracy", { precision: 5, scale: 4 }),
  biasScore: numeric("bias_score", { precision: 3, scale: 2 }),
  lastTrainedAt: timestamp(),
  deployedAt: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow()
});

// Threat intelligence feed
export const threatIntelligence = pgTable("threat_intelligence", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  threatType: text("threat_type").notNull(),
  description: text().notNull(),
  indicators: text().array().notNull(),
  confidence: numeric("confidence", { precision: 5, scale: 2 }).notNull(),
  source: text().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow()
});

// Security events log
export const securityEvents = pgTable("security_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  eventType: text("event_type").notNull(),
  severity: text().notNull(),
  message: text().notNull(),
  sourceIp: text("source_ip"),
  targetIp: text("target_ip"),
  userId: integer("user_id"),
  metadata: text(), // JSON string for additional data
  timestamp: timestamp().notNull(),
  processed: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow()
});

// AI ethics audits
export const aiEthicsAudits = pgTable("ai_ethics_audits", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  modelId: integer("model_id").notNull(),
  auditType: text("audit_type").notNull(), // bias, fairness, transparency, accountability
  result: text().notNull(), // passed, failed, warning
  score: numeric("score", { precision: 5, scale: 2 }),
  findings: text().notNull(),
  recommendations: text(),
  auditedBy: integer("audited_by").notNull(),
  auditDate: timestamp("audit_date").notNull(),
  nextAuditDue: timestamp("next_audit_due"),
  createdAt: timestamp().defaultNow()
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  createdIncidents: many(securityIncidents, { relationName: "createdBy" }),
  assignedIncidents: many(securityIncidents, { relationName: "assignedTo" }),
  ethicsAudits: many(aiEthicsAudits),
  securityEvents: many(securityEvents)
}));

export const securityIncidentsRelations = relations(securityIncidents, ({ one }) => ({
  creator: one(users, {
    fields: [securityIncidents.createdBy],
    references: [users.id],
    relationName: "createdBy"
  }),
  assignee: one(users, {
    fields: [securityIncidents.assignedTo],
    references: [users.id],
    relationName: "assignedTo"
  })
}));

export const aiModelsRelations = relations(aiModels, ({ many }) => ({
  ethicsAudits: many(aiEthicsAudits)
}));

export const aiEthicsAuditsRelations = relations(aiEthicsAudits, ({ one }) => ({
  model: one(aiModels, {
    fields: [aiEthicsAudits.modelId],
    references: [aiModels.id]
  }),
  auditor: one(users, {
    fields: [aiEthicsAudits.auditedBy],
    references: [users.id]
  })
}));

export const securityEventsRelations = relations(securityEvents, ({ one }) => ({
  user: one(users, {
    fields: [securityEvents.userId],
    references: [users.id]
  })
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertSecurityIncidentSchema = createInsertSchema(securityIncidents).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertThreatIntelligenceSchema = createInsertSchema(threatIntelligence).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertSecurityEventSchema = createInsertSchema(securityEvents).omit({
  id: true,
  createdAt: true
});

export const insertAiEthicsAuditSchema = createInsertSchema(aiEthicsAudits).omit({
  id: true,
  createdAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = z.infer<typeof insertSecurityIncidentSchema>;

export type AIModel = typeof aiModels.$inferSelect;
export type InsertAIModel = z.infer<typeof insertAiModelSchema>;

export type ThreatIntelligence = typeof threatIntelligence.$inferSelect;
export type InsertThreatIntelligence = z.infer<typeof insertThreatIntelligenceSchema>;

export type SecurityEvent = typeof securityEvents.$inferSelect;
export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;

export type AIEthicsAudit = typeof aiEthicsAudits.$inferSelect;
export type InsertAIEthicsAudit = z.infer<typeof insertAiEthicsAuditSchema>;
