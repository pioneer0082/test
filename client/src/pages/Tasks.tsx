import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { Badge } from "../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Task } from "../../../shared/schema";

const taskColumns = [
  {
    key: "title",
    label: "Task Title",
    sortable: true,
    render: (value: string) => (
      <div className="font-medium text-foreground">{value}</div>
    ),
  },
  {
    key: "description",
    label: "Description",
    render: (value: string) => (
      <div className="max-w-xs truncate text-muted-foreground">
        {value || "No description"}
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => (
      <Badge
        variant={
          value === "COMPLETED" ? "default" :
          value === "IN_PROGRESS" ? "secondary" :
          "outline"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "priority",
    label: "Priority",
    sortable: true,
    render: (value: string) => (
      <Badge
        variant={
          value === "HIGH" ? "destructive" :
          value === "MEDIUM" ? "secondary" :
          "outline"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "dueDate",
    label: "Due Date",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleDateString() : "-",
  },
];

export function Tasks() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: api.tasks.list,
  });

  return (
    <MainLayout 
      title="Tasks" 
      subtitle="Manage and track your tasks and assignments"
    >
      <div className="p-6">
        <DataTable
          title="All Tasks"
          columns={taskColumns}
          data={tasks}
          isLoading={isLoading}
          emptyMessage="No tasks found. Create your first task to get started."
          searchPlaceholder="Search tasks..."
        />
      </div>
    </MainLayout>
  );
}
