import { Link, useLocation } from "wouter";
import { cn } from "../../lib/utils";
import {
  Home,
  CheckSquare,
  Users,
  UserPlus,
  Building,
  Target,
  Folder,
  Clock,
  Mail,
  Calendar,
  BarChart,
  FileText,
  Database
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Users, label: "Contacts", path: "/contacts" },
  { icon: UserPlus, label: "Leads", path: "/leads" },
  { icon: Building, label: "Organizations", path: "/organizations" },
  { icon: Target, label: "Opportunities", path: "/opportunities" },
  { icon: Folder, label: "Projects", path: "/projects" },
  { icon: Clock, label: "Time", path: "/time" },
  { icon: Mail, label: "Emails", path: "/emails" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: BarChart, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Reports", path: "/reports" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-72 bg-sidebar-background dark:bg-sidebar-background border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <div className="gradient-bg p-4 flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <span className="text-white font-bold text-xl">Insightly</span>
        <span className="text-white/80 text-sm font-medium">CRM</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
          
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "sidebar-item flex items-center px-6 py-3 text-sidebar-foreground hover:text-primary cursor-pointer",
                  isActive && "active"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className={cn("font-medium", isActive && "font-semibold")}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
