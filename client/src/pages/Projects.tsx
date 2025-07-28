import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Project } from "../../../shared/schema";

const projectColumns = [
  {
    key: "name",
    label: "Project Name",
    sortable: true,
    render: (value: string) => (
      <div className="font-medium text-foreground">{value}</div>
    ),
  },
  {
    key: "status",
    label: "Project Status",
    sortable: true,
    render: (value: string) => (
      <Badge
        variant={
          value === "COMPLETED" ? "default" :
          value === "IN_PROGRESS" ? "secondary" :
          value === "NOT_STARTED" ? "outline" :
          "outline"
        }
      >
        {value.replace("_", " ")}
      </Badge>
    ),
  },
  {
    key: "category",
    label: "Project Category",
    render: (value: string) => value || "-",
  },
  {
    key: "responsibleUserId",
    label: "User Responsible",
    render: (value: string) => value || "Unassigned",
  },
  {
    key: "createdAt",
    label: "Project Created",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleDateString() : "-",
  },
];

export function Projects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: api.projects.list,
  });

  return (
    <MainLayout 
      title="All Projects" 
      subtitle="Manage your project portfolio and track progress"
    >
      <div className="p-6">
        <DataTable
          title="Project Portfolio"
          columns={projectColumns}
          data={projects}
          isLoading={isLoading}
          emptyMessage="No projects found. Create your first project to get started."
          searchPlaceholder="Search projects..."
        />
      </div>
    </MainLayout>
  );
}
