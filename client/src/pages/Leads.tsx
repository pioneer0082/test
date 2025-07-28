import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { Badge } from "../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Lead } from "@shared/schema";

const leadColumns = [
  {
    key: "firstName",
    label: "Full Name",
    sortable: true,
    render: (value: string, row: Lead) => (
      <div className="font-medium text-foreground">
        {`${row.firstName} ${row.lastName}`}
      </div>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (value: string) => value || "-",
  },
  {
    key: "organizationName",
    label: "Organization",
    render: (value: string) => value || "-",
  },
  {
    key: "phone",
    label: "Phone",
    render: (value: string) => value || "-",
  },
  {
    key: "email",
    label: "Email Address",
    render: (value: string) => (
      <div className="text-primary hover:underline cursor-pointer">
        {value || "-"}
      </div>
    ),
  },
  {
    key: "status",
    label: "Lead Status",
    sortable: true,
    render: (value: string) => (
      <Badge
        variant={
          value === "CLOSED" ? "default" :
          value === "OPEN" ? "secondary" :
          "outline"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    label: "Lead Created",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleDateString() : "-",
  },
];

export function Leads() {
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["/api/leads"],
    queryFn: api.leads.list,
  });

  return (
    <MainLayout 
      title="All Leads" 
      subtitle="Track and manage your sales leads and prospects"
    >
      <div className="p-6">
        <DataTable
          title="Lead Pipeline"
          columns={leadColumns}
          data={leads}
          isLoading={isLoading}
          emptyMessage="No leads found. Import or create your first lead to get started."
          searchPlaceholder="Search leads..."
        />
      </div>
    </MainLayout>
  );
}
