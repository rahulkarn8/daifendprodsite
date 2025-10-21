import { db } from "./db";
import { 
  users, 
  securityIncidents, 
  aiModels, 
  threatIntelligence, 
  securityEvents, 
  aiEthicsAudits 
} from "@shared/schema";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Get or create sample users
    let adminUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "admin")
    });
    
    if (!adminUser) {
      [adminUser] = await db.insert(users).values({
        username: "admin",
        email: "admin@daifend.com",
        password: "hashed_password_here", // In real app, use proper hashing
        role: "admin"
      }).returning();
    }

    let analystUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "security_analyst")
    });
    
    if (!analystUser) {
      [analystUser] = await db.insert(users).values({
        username: "security_analyst",
        email: "analyst@daifend.com",
        password: "hashed_password_here",
        role: "analyst"
      }).returning();
    }

    console.log("✅ Ensured sample users exist");

    // Create AI models
    const [threatDetectionModel] = await db.insert(aiModels).values({
      name: "Threat Detection Engine",
      version: "v2.1.0",
      type: "threat_detection",
      status: "active",
      accuracy: "0.9850",
      biasScore: "0.02",
      lastTrainedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      deployedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    }).returning();

    const [biasMonitorModel] = await db.insert(aiModels).values({
      name: "Bias Monitor System",
      version: "v1.3.2",
      type: "bias_monitor",
      status: "active",
      accuracy: "0.9720",
      biasScore: "0.01",
      lastTrainedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      deployedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    }).returning();

    const [contentFilterModel] = await db.insert(aiModels).values({
      name: "Content Safety Filter",
      version: "v1.8.1",
      type: "content_filter",
      status: "active",
      accuracy: "0.9950",
      biasScore: "0.03",
      lastTrainedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      deployedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
    }).returning();

    console.log("✅ Created AI models");

    // Create security incidents
    await db.insert(securityIncidents).values([
      {
        title: "Advanced Persistent Threat Detected",
        description: "Sophisticated AI-powered attack targeting user authentication systems. Multiple vectors detected including social engineering and credential stuffing.",
        severity: "critical",
        status: "investigating",
        threatLevel: "85.5",
        source: "External Network",
        detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        createdBy: analystUser.id,
        assignedTo: adminUser.id
      },
      {
        title: "Anomalous AI Model Behavior",
        description: "Bias monitor detected potential discriminatory patterns in threat classification. Requires immediate ethics review.",
        severity: "high",
        status: "open",
        threatLevel: "72.3",
        source: "AI Ethics Monitor",
        detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        createdBy: adminUser.id,
        assignedTo: analystUser.id
      },
      {
        title: "DDoS Attack Mitigated",
        description: "Large-scale distributed denial of service attack successfully mitigated by automated defense systems.",
        severity: "medium",
        status: "resolved",
        threatLevel: "45.8",
        source: "CDN Provider",
        detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        resolvedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        createdBy: analystUser.id,
        assignedTo: analystUser.id
      },
      {
        title: "Suspicious Data Access Pattern",
        description: "Unusual data access patterns detected suggesting potential insider threat or compromised credentials.",
        severity: "medium",
        status: "investigating",
        threatLevel: "58.2",
        source: "Internal Monitoring",
        detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        createdBy: adminUser.id,
        assignedTo: analystUser.id
      }
    ]);

    console.log("✅ Created security incidents");

    // Create threat intelligence
    await db.insert(threatIntelligence).values([
      {
        threatType: "Malware",
        description: "New AI-generated phishing emails with sophisticated social engineering techniques",
        indicators: ["suspicious_domain_1.com", "malicious_ip_192.168.1.100", "phishing_template_v3"],
        confidence: "92.5",
        source: "Threat Intelligence Feed",
        isActive: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      {
        threatType: "Data Breach",
        description: "Credentials leaked from third-party service, potential impact on user accounts",
        indicators: ["leaked_database_hash", "compromised_emails_list", "credential_stuffing_pattern"],
        confidence: "87.3",
        source: "Dark Web Monitoring",
        isActive: true,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
      },
      {
        threatType: "AI Attack",
        description: "Adversarial examples targeting machine learning models in production",
        indicators: ["adversarial_pattern_A", "model_evasion_technique", "gradient_attack_signature"],
        confidence: "78.9",
        source: "AI Security Research",
        isActive: true,
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
      }
    ]);

    console.log("✅ Created threat intelligence");

    // Create security events
    await db.insert(securityEvents).values([
      {
        eventType: "authentication_failure",
        severity: "medium",
        message: "Multiple failed login attempts detected from IP 203.0.113.45",
        sourceIp: "203.0.113.45",
        targetIp: "10.0.1.50",
        userId: analystUser.id,
        metadata: JSON.stringify({
          attemptCount: 5,
          timeWindow: "5 minutes",
          userAgent: "Mozilla/5.0 (suspicious)"
        }),
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        processed: true
      },
      {
        eventType: "ai_model_alert",
        severity: "high",
        message: "Bias threshold exceeded in threat classification model",
        userId: adminUser.id,
        metadata: JSON.stringify({
          modelId: threatDetectionModel.id,
          biasScore: 0.15,
          threshold: 0.10,
          affectedSamples: 23
        }),
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        processed: false
      },
      {
        eventType: "threat_detected",
        severity: "critical",
        message: "Advanced persistent threat identified targeting authentication system",
        sourceIp: "198.51.100.25",
        targetIp: "10.0.1.100",
        metadata: JSON.stringify({
          threatType: "APT",
          confidence: 0.92,
          techniques: ["credential_stuffing", "social_engineering"]
        }),
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        processed: true
      }
    ]);

    console.log("✅ Created security events");

    // Create AI ethics audits
    await db.insert(aiEthicsAudits).values([
      {
        modelId: threatDetectionModel.id,
        auditType: "bias",
        result: "passed",
        score: "95.2",
        findings: "Model demonstrates fair performance across all demographic groups with minimal bias indicators.",
        recommendations: "Continue regular monitoring. Consider additional fairness metrics in next audit cycle.",
        auditedBy: adminUser.id,
        auditDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        nextAuditDue: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000) // 23 days from now
      },
      {
        modelId: biasMonitorModel.id,
        auditType: "transparency",
        result: "passed",
        score: "88.7",
        findings: "Model provides adequate explainability for decision-making processes. Some improvement areas identified.",
        recommendations: "Enhance explanation quality for edge cases. Implement additional visualization tools.",
        auditedBy: analystUser.id,
        auditDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        nextAuditDue: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000) // 16 days from now
      },
      {
        modelId: contentFilterModel.id,
        auditType: "accountability",
        result: "warning",
        score: "76.4",
        findings: "Audit trail completeness needs improvement. Some decision logs are incomplete or unclear.",
        recommendations: "Implement comprehensive logging. Establish clear accountability chains for automated decisions.",
        auditedBy: adminUser.id,
        auditDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
        nextAuditDue: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000) // 9 days from now
      }
    ]);

    console.log("✅ Created AI ethics audits");
    console.log("🎉 Database seeding completed successfully!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}