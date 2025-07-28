import { apiRequest } from "./queryClient";

export const api = {
  // Organizations
  organizations: {
    list: () => fetch("/api/organizations").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/organizations", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/organizations/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/organizations/${id}`),
  },

  // Contacts
  contacts: {
    list: () => fetch("/api/contacts").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/contacts", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/contacts/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/contacts/${id}`),
  },

  // Leads
  leads: {
    list: () => fetch("/api/leads").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/leads", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/leads/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/leads/${id}`),
  },

  // Opportunities
  opportunities: {
    list: () => fetch("/api/opportunities").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/opportunities", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/opportunities/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/opportunities/${id}`),
  },

  // Projects
  projects: {
    list: () => fetch("/api/projects").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/projects", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/projects/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/projects/${id}`),
  },

  // Tasks
  tasks: {
    list: () => fetch("/api/tasks").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/tasks", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/tasks/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/tasks/${id}`),
  },

  // Time Entries
  timeEntries: {
    list: () => fetch("/api/time-entries").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/time-entries", data),
    update: (id: string, data: any) => apiRequest("PUT", `/api/time-entries/${id}`, data),
    delete: (id: string) => apiRequest("DELETE", `/api/time-entries/${id}`),
  },

  // Emails
  emails: {
    list: () => fetch("/api/emails").then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/emails", data),
    delete: (id: string) => apiRequest("DELETE", `/api/emails/${id}`),
  },

  // Users
  users: {
    list: () => fetch("/api/users").then(res => res.json()),
  },
};
