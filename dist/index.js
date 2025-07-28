// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  organizations = /* @__PURE__ */ new Map();
  contacts = /* @__PURE__ */ new Map();
  leads = /* @__PURE__ */ new Map();
  opportunities = /* @__PURE__ */ new Map();
  projects = /* @__PURE__ */ new Map();
  tasks = /* @__PURE__ */ new Map();
  timeEntries = /* @__PURE__ */ new Map();
  emails = /* @__PURE__ */ new Map();
  constructor() {
    this.initializeData();
  }
  initializeData() {
    const defaultUser = {
      id: randomUUID(),
      username: "samir.barker",
      password: "password",
      email: "samir.barker@insightly.com",
      firstName: "Samir",
      lastName: "Barker",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(defaultUser.id, defaultUser);
    this.initializeSampleData(defaultUser.id);
  }
  initializeSampleData(userId) {
    const sampleOrgs = [
      { name: "Clampett Oil and Gas", phone: "(626) 847-1294", billingStreet: "1000 Escalon Street", billingCity: "Palo Alto", billingState: "CA", billingCountry: "United States" },
      { name: "Globex", phone: "(852) 28765046", billingStreet: "182-190 Tai Lin Pai Road", billingCity: "Hong Kong", billingState: null, billingCountry: "China" },
      { name: "Jakubowski LLC", phone: "(419) 176-2116", billingStreet: "101 Washer Crossing", billingCity: "Long Beach", billingState: "CA", billingCountry: "United States" },
      { name: "King Group", phone: "(497) 889-1015", billingStreet: "18 Baker Street", billingCity: "Sydney", billingState: "NSW", billingCountry: "Australia" }
    ];
    const orgIds = [];
    sampleOrgs.forEach((org) => {
      const id = randomUUID();
      const organization = {
        id,
        ...org,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.organizations.set(id, organization);
      orgIds.push(id);
    });
    const sampleContacts = [
      { firstName: "Aaron", lastName: "Lang", title: "CMO", phone: "(65) 64367228", email: "aaron.lang@clampett.com", organizationId: orgIds[0] },
      { firstName: "Albert", lastName: "Lee", title: "Facility Manager", phone: "(970) 805-8775", email: "albert.lee@globex.com", organizationId: orgIds[1] },
      { firstName: "Barbara", lastName: "Lane", title: "VP of Sales", phone: "(419) 176-2116", email: "blane@jakubowski.com", organizationId: orgIds[2] },
      { firstName: "Carlos", lastName: "Smith", title: "CEO", phone: "(571) 957-6840", email: "carlos.smith@warbucks.com", organizationId: null },
      { firstName: "Chris", lastName: "Chen", title: "Property Manager", phone: "(497) 889-1015", email: "chris.chen@kinggroup.com", organizationId: orgIds[3] }
    ];
    sampleContacts.forEach((contact) => {
      const id = randomUUID();
      const contactEntity = {
        id,
        ...contact,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.contacts.set(id, contactEntity);
    });
    const sampleLeads = [
      { firstName: "Anne", lastName: "Lynch", title: "VP of Sales", organizationName: "Howe-Brand", phone: "(406) 653-3", email: "anne.lynch@howeb.com", status: "CLOSED", ownerId: userId },
      { firstName: "Brian", lastName: "Wilson", title: "Manager", organizationName: "Briggs-Auer", phone: "(251) 735-6", email: "bwilson@ba.com", status: "CLOSED", ownerId: userId },
      { firstName: "David", lastName: "Martin", title: "Finance Director", organizationName: "Ekern and Son", phone: "(570) 418-0", email: "david@ekern.com", status: "OPEN", ownerId: userId }
    ];
    sampleLeads.forEach((lead) => {
      const id = randomUUID();
      const leadEntity = {
        id,
        ...lead,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.leads.set(id, leadEntity);
    });
    const sampleOpportunities = [
      { name: "Whirlybird CSR", organizationId: orgIds[0], pipeline: "Sales Pipeline", forecastCloseDate: /* @__PURE__ */ new Date("2025-08-26"), value: "3000.00", probability: 100, ownerId: userId, status: "OPEN" },
      { name: "Whirlybird Construction", organizationId: orgIds[1], pipeline: "Sales Pipeline", forecastCloseDate: /* @__PURE__ */ new Date("2025-08-26"), value: "1800.00", probability: 75, ownerId: userId, status: "OPEN" },
      { name: "Whirlybird Training", organizationId: orgIds[2], pipeline: "Sales Pipeline", forecastCloseDate: /* @__PURE__ */ new Date("2025-08-26"), value: "4500.00", probability: 100, ownerId: userId, status: "OPEN" }
    ];
    sampleOpportunities.forEach((opportunity) => {
      const id = randomUUID();
      const opportunityEntity = {
        id,
        ...opportunity,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.opportunities.set(id, opportunityEntity);
    });
    const sampleProjects = [
      { name: "Whirlybird CSR", status: "COMPLETED", category: "Sales", responsibleUserId: userId },
      { name: "Whirlybird Construction", status: "COMPLETED", category: "Sales", responsibleUserId: userId },
      { name: "Whirlybird Training", status: "NOT_STARTED", category: "Sales", responsibleUserId: userId },
      { name: "Whirlybird Development", status: "IN_PROGRESS", category: "Development", responsibleUserId: userId }
    ];
    sampleProjects.forEach((project) => {
      const id = randomUUID();
      const projectEntity = {
        id,
        ...project,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.projects.set(id, projectEntity);
    });
    const sampleTasks = [
      { title: "Personalize your account", description: "Set up your profile and preferences", status: "NOT_STARTED", priority: "MEDIUM", dueDate: /* @__PURE__ */ new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Add your customer data", description: "Import existing customer information", status: "NOT_STARTED", priority: "HIGH", dueDate: /* @__PURE__ */ new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Invite your team members", description: "Add team members to collaborate", status: "NOT_STARTED", priority: "MEDIUM", dueDate: /* @__PURE__ */ new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Save your email templates", description: "Create reusable email templates", status: "NOT_STARTED", priority: "LOW", dueDate: /* @__PURE__ */ new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Connect to your favorite apps", description: "Integrate with external applications", status: "NOT_STARTED", priority: "MEDIUM", dueDate: /* @__PURE__ */ new Date("2025-08-01"), assignedToId: userId, projectId: null }
    ];
    sampleTasks.forEach((task) => {
      const id = randomUUID();
      const taskEntity = {
        id,
        ...task,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.tasks.set(id, taskEntity);
    });
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id, createdAt: /* @__PURE__ */ new Date() };
    this.users.set(id, user);
    return user;
  }
  async getUsers() {
    return Array.from(this.users.values());
  }
  // Organizations
  async getOrganizations() {
    return Array.from(this.organizations.values());
  }
  async getOrganization(id) {
    return this.organizations.get(id);
  }
  async createOrganization(insertOrganization) {
    const id = randomUUID();
    const organization = {
      ...insertOrganization,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      phone: insertOrganization.phone || null,
      billingStreet: insertOrganization.billingStreet || null,
      billingCity: insertOrganization.billingCity || null,
      billingState: insertOrganization.billingState || null,
      billingCountry: insertOrganization.billingCountry || null
    };
    this.organizations.set(id, organization);
    return organization;
  }
  async updateOrganization(id, updates) {
    const existing = this.organizations.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.organizations.set(id, updated);
    return updated;
  }
  async deleteOrganization(id) {
    return this.organizations.delete(id);
  }
  // Contacts
  async getContacts() {
    return Array.from(this.contacts.values());
  }
  async getContact(id) {
    return this.contacts.get(id);
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      title: insertContact.title || null,
      phone: insertContact.phone || null,
      email: insertContact.email || null,
      organizationId: insertContact.organizationId || null
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async updateContact(id, updates) {
    const existing = this.contacts.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.contacts.set(id, updated);
    return updated;
  }
  async deleteContact(id) {
    return this.contacts.delete(id);
  }
  // Leads
  async getLeads() {
    return Array.from(this.leads.values());
  }
  async getLead(id) {
    return this.leads.get(id);
  }
  async createLead(insertLead) {
    const id = randomUUID();
    const lead = {
      ...insertLead,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      title: insertLead.title || null,
      organizationName: insertLead.organizationName || null,
      phone: insertLead.phone || null,
      email: insertLead.email || null,
      status: insertLead.status || "OPEN",
      ownerId: insertLead.ownerId || null
    };
    this.leads.set(id, lead);
    return lead;
  }
  async updateLead(id, updates) {
    const existing = this.leads.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.leads.set(id, updated);
    return updated;
  }
  async deleteLead(id) {
    return this.leads.delete(id);
  }
  // Opportunities
  async getOpportunities() {
    return Array.from(this.opportunities.values());
  }
  async getOpportunity(id) {
    return this.opportunities.get(id);
  }
  async createOpportunity(insertOpportunity) {
    const id = randomUUID();
    const opportunity = {
      ...insertOpportunity,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      organizationId: insertOpportunity.organizationId || null,
      forecastCloseDate: insertOpportunity.forecastCloseDate || null,
      value: insertOpportunity.value || null,
      probability: insertOpportunity.probability || 0,
      ownerId: insertOpportunity.ownerId || null,
      status: insertOpportunity.status || "OPEN"
    };
    this.opportunities.set(id, opportunity);
    return opportunity;
  }
  async updateOpportunity(id, updates) {
    const existing = this.opportunities.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.opportunities.set(id, updated);
    return updated;
  }
  async deleteOpportunity(id) {
    return this.opportunities.delete(id);
  }
  // Projects
  async getProjects() {
    return Array.from(this.projects.values());
  }
  async getProject(id) {
    return this.projects.get(id);
  }
  async createProject(insertProject) {
    const id = randomUUID();
    const project = {
      ...insertProject,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertProject.status || "NOT_STARTED",
      category: insertProject.category || null,
      responsibleUserId: insertProject.responsibleUserId || null
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id, updates) {
    const existing = this.projects.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.projects.set(id, updated);
    return updated;
  }
  async deleteProject(id) {
    return this.projects.delete(id);
  }
  // Tasks
  async getTasks() {
    return Array.from(this.tasks.values());
  }
  async getTask(id) {
    return this.tasks.get(id);
  }
  async createTask(insertTask) {
    const id = randomUUID();
    const task = {
      ...insertTask,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertTask.description || null,
      status: insertTask.status || "PENDING",
      priority: insertTask.priority || null,
      dueDate: insertTask.dueDate || null,
      assignedToId: insertTask.assignedToId || null,
      projectId: insertTask.projectId || null
    };
    this.tasks.set(id, task);
    return task;
  }
  async updateTask(id, updates) {
    const existing = this.tasks.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }
  async deleteTask(id) {
    return this.tasks.delete(id);
  }
  // Time Entries
  async getTimeEntries() {
    return Array.from(this.timeEntries.values());
  }
  async getTimeEntry(id) {
    return this.timeEntries.get(id);
  }
  async createTimeEntry(insertTimeEntry) {
    const id = randomUUID();
    const timeEntry = {
      ...insertTimeEntry,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      userId: insertTimeEntry.userId || null,
      projectId: insertTimeEntry.projectId || null,
      taskId: insertTimeEntry.taskId || null,
      hours: insertTimeEntry.hours || null,
      description: insertTimeEntry.description || null,
      date: insertTimeEntry.date || /* @__PURE__ */ new Date()
    };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }
  async updateTimeEntry(id, updates) {
    const existing = this.timeEntries.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.timeEntries.set(id, updated);
    return updated;
  }
  async deleteTimeEntry(id) {
    return this.timeEntries.delete(id);
  }
  // Emails
  async getEmails() {
    return Array.from(this.emails.values());
  }
  async getEmail(id) {
    return this.emails.get(id);
  }
  async createEmail(insertEmail) {
    const id = randomUUID();
    const email = {
      ...insertEmail,
      id,
      body: insertEmail.body || null,
      contactId: insertEmail.contactId || null,
      organizationId: insertEmail.organizationId || null,
      sentAt: insertEmail.sentAt || /* @__PURE__ */ new Date()
    };
    this.emails.set(id, email);
    return email;
  }
  async deleteEmail(id) {
    return this.emails.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var organizations = pgTable("organizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone"),
  billingStreet: text("billing_street"),
  billingCity: text("billing_city"),
  billingState: text("billing_state"),
  billingCountry: text("billing_country"),
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title"),
  phone: text("phone"),
  email: text("email"),
  organizationId: varchar("organization_id").references(() => organizations.id),
  createdAt: timestamp("created_at").defaultNow()
});
var leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title"),
  organizationName: text("organization_name"),
  phone: text("phone"),
  email: text("email"),
  status: text("status").notNull().default("OPEN"),
  ownerId: varchar("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});
var opportunities = pgTable("opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  organizationId: varchar("organization_id").references(() => organizations.id),
  pipeline: text("pipeline").notNull(),
  forecastCloseDate: timestamp("forecast_close_date"),
  value: decimal("value", { precision: 10, scale: 2 }),
  probability: integer("probability").default(0),
  ownerId: varchar("owner_id").references(() => users.id),
  status: text("status").notNull().default("OPEN"),
  createdAt: timestamp("created_at").defaultNow()
});
var projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  status: text("status").notNull().default("NOT_STARTED"),
  category: text("category"),
  responsibleUserId: varchar("responsible_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});
var tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("PENDING"),
  priority: text("priority").default("MEDIUM"),
  dueDate: timestamp("due_date"),
  assignedToId: varchar("assigned_to_id").references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id),
  createdAt: timestamp("created_at").defaultNow()
});
var timeEntries = pgTable("time_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id),
  taskId: varchar("task_id").references(() => tasks.id),
  hours: decimal("hours", { precision: 5, scale: 2 }),
  description: text("description"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var emails = pgTable("emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subject: text("subject").notNull(),
  body: text("body"),
  fromEmail: text("from_email").notNull(),
  toEmail: text("to_email").notNull(),
  contactId: varchar("contact_id").references(() => contacts.id),
  organizationId: varchar("organization_id").references(() => organizations.id),
  sentAt: timestamp("sent_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
var insertOrganizationSchema = createInsertSchema(organizations).omit({ id: true, createdAt: true });
var insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
var insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });
var insertOpportunitySchema = createInsertSchema(opportunities).omit({ id: true, createdAt: true });
var insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
var insertTaskSchema = createInsertSchema(tasks).omit({ id: true, createdAt: true });
var insertTimeEntrySchema = createInsertSchema(timeEntries).omit({ id: true, createdAt: true });
var insertEmailSchema = createInsertSchema(emails).omit({ id: true });

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/organizations", async (req, res) => {
    try {
      const organizations2 = await storage.getOrganizations();
      res.json(organizations2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organizations" });
    }
  });
  app2.post("/api/organizations", async (req, res) => {
    try {
      const validatedData = insertOrganizationSchema.parse(req.body);
      const organization = await storage.createOrganization(validatedData);
      res.json(organization);
    } catch (error) {
      res.status(400).json({ message: "Invalid organization data" });
    }
  });
  app2.put("/api/organizations/:id", async (req, res) => {
    try {
      const validatedData = insertOrganizationSchema.partial().parse(req.body);
      const organization = await storage.updateOrganization(req.params.id, validatedData);
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
      res.json(organization);
    } catch (error) {
      res.status(400).json({ message: "Invalid organization data" });
    }
  });
  app2.delete("/api/organizations/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteOrganization(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Organization not found" });
      }
      res.json({ message: "Organization deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete organization" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });
  app2.put("/api/contacts/:id", async (req, res) => {
    try {
      const validatedData = insertContactSchema.partial().parse(req.body);
      const contact = await storage.updateContact(req.params.id, validatedData);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });
  app2.delete("/api/contacts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteContact(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact" });
    }
  });
  app2.get("/api/leads", async (req, res) => {
    try {
      const leads2 = await storage.getLeads();
      res.json(leads2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });
  app2.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json(lead);
    } catch (error) {
      res.status(400).json({ message: "Invalid lead data" });
    }
  });
  app2.put("/api/leads/:id", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.partial().parse(req.body);
      const lead = await storage.updateLead(req.params.id, validatedData);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(400).json({ message: "Invalid lead data" });
    }
  });
  app2.delete("/api/leads/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteLead(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json({ message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });
  app2.get("/api/opportunities", async (req, res) => {
    try {
      const opportunities2 = await storage.getOpportunities();
      res.json(opportunities2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch opportunities" });
    }
  });
  app2.post("/api/opportunities", async (req, res) => {
    try {
      const validatedData = insertOpportunitySchema.parse(req.body);
      const opportunity = await storage.createOpportunity(validatedData);
      res.json(opportunity);
    } catch (error) {
      res.status(400).json({ message: "Invalid opportunity data" });
    }
  });
  app2.put("/api/opportunities/:id", async (req, res) => {
    try {
      const validatedData = insertOpportunitySchema.partial().parse(req.body);
      const opportunity = await storage.updateOpportunity(req.params.id, validatedData);
      if (!opportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
      res.json(opportunity);
    } catch (error) {
      res.status(400).json({ message: "Invalid opportunity data" });
    }
  });
  app2.delete("/api/opportunities/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteOpportunity(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
      res.json({ message: "Opportunity deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete opportunity" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });
  app2.put("/api/projects/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });
  app2.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  app2.get("/api/tasks", async (req, res) => {
    try {
      const tasks2 = await storage.getTasks();
      res.json(tasks2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });
  app2.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: "Invalid task data" });
    }
  });
  app2.put("/api/tasks/:id", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.partial().parse(req.body);
      const task = await storage.updateTask(req.params.id, validatedData);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: "Invalid task data" });
    }
  });
  app2.delete("/api/tasks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTask(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });
  app2.get("/api/time-entries", async (req, res) => {
    try {
      const timeEntries2 = await storage.getTimeEntries();
      res.json(timeEntries2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch time entries" });
    }
  });
  app2.post("/api/time-entries", async (req, res) => {
    try {
      const validatedData = insertTimeEntrySchema.parse(req.body);
      const timeEntry = await storage.createTimeEntry(validatedData);
      res.json(timeEntry);
    } catch (error) {
      res.status(400).json({ message: "Invalid time entry data" });
    }
  });
  app2.get("/api/emails", async (req, res) => {
    try {
      const emails2 = await storage.getEmails();
      res.json(emails2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emails" });
    }
  });
  app2.post("/api/emails", async (req, res) => {
    try {
      const validatedData = insertEmailSchema.parse(req.body);
      const email = await storage.createEmail(validatedData);
      res.json(email);
    } catch (error) {
      res.status(400).json({ message: "Invalid email data" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      const users2 = await storage.getUsers();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
