import {
  type User, type InsertUser,
  type Organization, type InsertOrganization,
  type Contact, type InsertContact,
  type Lead, type InsertLead,
  type Opportunity, type InsertOpportunity,
  type Project, type InsertProject,
  type Task, type InsertTask,
  type TimeEntry, type InsertTimeEntry,
  type Email, type InsertEmail
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;

  // Organizations
  getOrganizations(): Promise<Organization[]>;
  getOrganization(id: string): Promise<Organization | undefined>;
  createOrganization(organization: InsertOrganization): Promise<Organization>;
  updateOrganization(id: string, organization: Partial<InsertOrganization>): Promise<Organization | undefined>;
  deleteOrganization(id: string): Promise<boolean>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;

  // Leads
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;

  // Opportunities
  getOpportunities(): Promise<Opportunity[]>;
  getOpportunity(id: string): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  updateOpportunity(id: string, opportunity: Partial<InsertOpportunity>): Promise<Opportunity | undefined>;
  deleteOpportunity(id: string): Promise<boolean>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Tasks
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;

  // Time Entries
  getTimeEntries(): Promise<TimeEntry[]>;
  getTimeEntry(id: string): Promise<TimeEntry | undefined>;
  createTimeEntry(entry: InsertTimeEntry): Promise<TimeEntry>;
  updateTimeEntry(id: string, entry: Partial<InsertTimeEntry>): Promise<TimeEntry | undefined>;
  deleteTimeEntry(id: string): Promise<boolean>;

  // Emails
  getEmails(): Promise<Email[]>;
  getEmail(id: string): Promise<Email | undefined>;
  createEmail(email: InsertEmail): Promise<Email>;
  deleteEmail(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private organizations: Map<string, Organization> = new Map();
  private contacts: Map<string, Contact> = new Map();
  private leads: Map<string, Lead> = new Map();
  private opportunities: Map<string, Opportunity> = new Map();
  private projects: Map<string, Project> = new Map();
  private tasks: Map<string, Task> = new Map();
  private timeEntries: Map<string, TimeEntry> = new Map();
  private emails: Map<string, Email> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: randomUUID(),
      username: "samir.barker",
      password: "password",
      email: "samir.barker@insightly.com",
      firstName: "Samir",
      lastName: "Barker",
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Initialize with sample data for demonstration
    this.initializeSampleData(defaultUser.id);
  }

  private initializeSampleData(userId: string) {
    // Sample Organizations
    const sampleOrgs = [
      { name: "Clampett Oil and Gas", phone: "(626) 847-1294", billingStreet: "1000 Escalon Street", billingCity: "Palo Alto", billingState: "CA", billingCountry: "United States" },
      { name: "Globex", phone: "(852) 28765046", billingStreet: "182-190 Tai Lin Pai Road", billingCity: "Hong Kong", billingState: null, billingCountry: "China" },
      { name: "Jakubowski LLC", phone: "(419) 176-2116", billingStreet: "101 Washer Crossing", billingCity: "Long Beach", billingState: "CA", billingCountry: "United States" },
      { name: "King Group", phone: "(497) 889-1015", billingStreet: "18 Baker Street", billingCity: "Sydney", billingState: "NSW", billingCountry: "Australia" },
    ];

    const orgIds: string[] = [];
    sampleOrgs.forEach(org => {
      const id = randomUUID();
      const organization: Organization = {
        id,
        ...org,
        createdAt: new Date(),
      };
      this.organizations.set(id, organization);
      orgIds.push(id);
    });

    // Sample Contacts
    const sampleContacts = [
      { firstName: "Aaron", lastName: "Lang", title: "CMO", phone: "(65) 64367228", email: "aaron.lang@clampett.com", organizationId: orgIds[0] },
      { firstName: "Albert", lastName: "Lee", title: "Facility Manager", phone: "(970) 805-8775", email: "albert.lee@globex.com", organizationId: orgIds[1] },
      { firstName: "Barbara", lastName: "Lane", title: "VP of Sales", phone: "(419) 176-2116", email: "blane@jakubowski.com", organizationId: orgIds[2] },
      { firstName: "Carlos", lastName: "Smith", title: "CEO", phone: "(571) 957-6840", email: "carlos.smith@warbucks.com", organizationId: null },
      { firstName: "Chris", lastName: "Chen", title: "Property Manager", phone: "(497) 889-1015", email: "chris.chen@kinggroup.com", organizationId: orgIds[3] },
    ];

    sampleContacts.forEach(contact => {
      const id = randomUUID();
      const contactEntity: Contact = {
        id,
        ...contact,
        createdAt: new Date(),
      };
      this.contacts.set(id, contactEntity);
    });

    // Sample Leads
    const sampleLeads = [
      { firstName: "Anne", lastName: "Lynch", title: "VP of Sales", organizationName: "Howe-Brand", phone: "(406) 653-3", email: "anne.lynch@howeb.com", status: "CLOSED", ownerId: userId },
      { firstName: "Brian", lastName: "Wilson", title: "Manager", organizationName: "Briggs-Auer", phone: "(251) 735-6", email: "bwilson@ba.com", status: "CLOSED", ownerId: userId },
      { firstName: "David", lastName: "Martin", title: "Finance Director", organizationName: "Ekern and Son", phone: "(570) 418-0", email: "david@ekern.com", status: "OPEN", ownerId: userId },
    ];

    sampleLeads.forEach(lead => {
      const id = randomUUID();
      const leadEntity: Lead = {
        id,
        ...lead,
        createdAt: new Date(),
      };
      this.leads.set(id, leadEntity);
    });

    // Sample Opportunities
    const sampleOpportunities = [
      { name: "Whirlybird CSR", organizationId: orgIds[0], pipeline: "Sales Pipeline", forecastCloseDate: new Date("2025-08-26"), value: "3000.00", probability: 100, ownerId: userId, status: "OPEN" },
      { name: "Whirlybird Construction", organizationId: orgIds[1], pipeline: "Sales Pipeline", forecastCloseDate: new Date("2025-08-26"), value: "1800.00", probability: 75, ownerId: userId, status: "OPEN" },
      { name: "Whirlybird Training", organizationId: orgIds[2], pipeline: "Sales Pipeline", forecastCloseDate: new Date("2025-08-26"), value: "4500.00", probability: 100, ownerId: userId, status: "OPEN" },
    ];

    sampleOpportunities.forEach(opportunity => {
      const id = randomUUID();
      const opportunityEntity: Opportunity = {
        id,
        ...opportunity,
        createdAt: new Date(),
      };
      this.opportunities.set(id, opportunityEntity);
    });

    // Sample Projects
    const sampleProjects = [
      { name: "Whirlybird CSR", status: "COMPLETED", category: "Sales", responsibleUserId: userId },
      { name: "Whirlybird Construction", status: "COMPLETED", category: "Sales", responsibleUserId: userId },
      { name: "Whirlybird Training", status: "NOT_STARTED", category: "Sales", responsibleUserId: userId },
      { name: "Whirlybird Development", status: "IN_PROGRESS", category: "Development", responsibleUserId: userId },
    ];

    sampleProjects.forEach(project => {
      const id = randomUUID();
      const projectEntity: Project = {
        id,
        ...project,
        createdAt: new Date(),
      };
      this.projects.set(id, projectEntity);
    });

    // Sample Tasks
    const sampleTasks = [
      { title: "Personalize your account", description: "Set up your profile and preferences", status: "NOT_STARTED", priority: "MEDIUM", dueDate: new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Add your customer data", description: "Import existing customer information", status: "NOT_STARTED", priority: "HIGH", dueDate: new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Invite your team members", description: "Add team members to collaborate", status: "NOT_STARTED", priority: "MEDIUM", dueDate: new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Save your email templates", description: "Create reusable email templates", status: "NOT_STARTED", priority: "LOW", dueDate: new Date("2025-08-01"), assignedToId: userId, projectId: null },
      { title: "Connect to your favorite apps", description: "Integrate with external applications", status: "NOT_STARTED", priority: "MEDIUM", dueDate: new Date("2025-08-01"), assignedToId: userId, projectId: null },
    ];

    sampleTasks.forEach(task => {
      const id = randomUUID();
      const taskEntity: Task = {
        id,
        ...task,
        createdAt: new Date(),
      };
      this.tasks.set(id, taskEntity);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Organizations
  async getOrganizations(): Promise<Organization[]> {
    return Array.from(this.organizations.values());
  }

  async getOrganization(id: string): Promise<Organization | undefined> {
    return this.organizations.get(id);
  }

  async createOrganization(insertOrganization: InsertOrganization): Promise<Organization> {
    const id = randomUUID();
    const organization: Organization = { 
      ...insertOrganization, 
      id, 
      createdAt: new Date(),
      phone: insertOrganization.phone || null,
      billingStreet: insertOrganization.billingStreet || null,
      billingCity: insertOrganization.billingCity || null,
      billingState: insertOrganization.billingState || null,
      billingCountry: insertOrganization.billingCountry || null,
    };
    this.organizations.set(id, organization);
    return organization;
  }

  async updateOrganization(id: string, updates: Partial<InsertOrganization>): Promise<Organization | undefined> {
    const existing = this.organizations.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.organizations.set(id, updated);
    return updated;
  }

  async deleteOrganization(id: string): Promise<boolean> {
    return this.organizations.delete(id);
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      title: insertContact.title || null,
      phone: insertContact.phone || null,
      email: insertContact.email || null,
      organizationId: insertContact.organizationId || null,
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContact(id: string, updates: Partial<InsertContact>): Promise<Contact | undefined> {
    const existing = this.contacts.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.contacts.set(id, updated);
    return updated;
  }

  async deleteContact(id: string): Promise<boolean> {
    return this.contacts.delete(id);
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date(),
      title: insertLead.title || null,
      organizationName: insertLead.organizationName || null,
      phone: insertLead.phone || null,
      email: insertLead.email || null,
      status: insertLead.status || "OPEN",
      ownerId: insertLead.ownerId || null,
    };
    this.leads.set(id, lead);
    return lead;
  }

  async updateLead(id: string, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const existing = this.leads.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.leads.set(id, updated);
    return updated;
  }

  async deleteLead(id: string): Promise<boolean> {
    return this.leads.delete(id);
  }

  // Opportunities
  async getOpportunities(): Promise<Opportunity[]> {
    return Array.from(this.opportunities.values());
  }

  async getOpportunity(id: string): Promise<Opportunity | undefined> {
    return this.opportunities.get(id);
  }

  async createOpportunity(insertOpportunity: InsertOpportunity): Promise<Opportunity> {
    const id = randomUUID();
    const opportunity: Opportunity = { 
      ...insertOpportunity, 
      id, 
      createdAt: new Date(),
      organizationId: insertOpportunity.organizationId || null,
      forecastCloseDate: insertOpportunity.forecastCloseDate || null,
      value: insertOpportunity.value || null,
      probability: insertOpportunity.probability || 0,
      ownerId: insertOpportunity.ownerId || null,
      status: insertOpportunity.status || "OPEN",
    };
    this.opportunities.set(id, opportunity);
    return opportunity;
  }

  async updateOpportunity(id: string, updates: Partial<InsertOpportunity>): Promise<Opportunity | undefined> {
    const existing = this.opportunities.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.opportunities.set(id, updated);
    return updated;
  }

  async deleteOpportunity(id: string): Promise<boolean> {
    return this.opportunities.delete(id);
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date(),
      status: insertProject.status || "NOT_STARTED",
      category: insertProject.category || null,
      responsibleUserId: insertProject.responsibleUserId || null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = { 
      ...insertTask, 
      id, 
      createdAt: new Date(),
      description: insertTask.description || null,
      status: insertTask.status || "PENDING",
      priority: insertTask.priority || null,
      dueDate: insertTask.dueDate || null,
      assignedToId: insertTask.assignedToId || null,
      projectId: insertTask.projectId || null,
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updates: Partial<InsertTask>): Promise<Task | undefined> {
    const existing = this.tasks.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Time Entries
  async getTimeEntries(): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values());
  }

  async getTimeEntry(id: string): Promise<TimeEntry | undefined> {
    return this.timeEntries.get(id);
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const id = randomUUID();
    const timeEntry: TimeEntry = { 
      ...insertTimeEntry, 
      id, 
      createdAt: new Date(),
      userId: insertTimeEntry.userId || null,
      projectId: insertTimeEntry.projectId || null,
      taskId: insertTimeEntry.taskId || null,
      hours: insertTimeEntry.hours || null,
      description: insertTimeEntry.description || null,
      date: insertTimeEntry.date || new Date(),
    };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }

  async updateTimeEntry(id: string, updates: Partial<InsertTimeEntry>): Promise<TimeEntry | undefined> {
    const existing = this.timeEntries.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.timeEntries.set(id, updated);
    return updated;
  }

  async deleteTimeEntry(id: string): Promise<boolean> {
    return this.timeEntries.delete(id);
  }

  // Emails
  async getEmails(): Promise<Email[]> {
    return Array.from(this.emails.values());
  }

  async getEmail(id: string): Promise<Email | undefined> {
    return this.emails.get(id);
  }

  async createEmail(insertEmail: InsertEmail): Promise<Email> {
    const id = randomUUID();
    const email: Email = { 
      ...insertEmail, 
      id,
      body: insertEmail.body || null,
      contactId: insertEmail.contactId || null,
      organizationId: insertEmail.organizationId || null,
      sentAt: insertEmail.sentAt || new Date(),
    };
    this.emails.set(id, email);
    return email;
  }

  async deleteEmail(id: string): Promise<boolean> {
    return this.emails.delete(id);
  }
}

export const storage = new MemStorage();
