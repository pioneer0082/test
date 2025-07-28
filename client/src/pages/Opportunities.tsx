import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Opportunity } from "@shared/schema";

const opportunityColumns = [
  {
    key: "name",
    label: "Opportunity Name",
    sortable: true,
    render: (value: string) => (
      <div className="font-medium text-foreground">{value}</div>
    ),
  },
  {
    key: "organizationId",
    label: "Organization",
    render: (value: string) => value || "No Organization",
  },
  {
    key: "pipeline",
    label: "Pipeline",
    render: (value: string, row: Opportunity) => (
      <div className="flex items-center space-x-2">
        <div className="w-20 bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${row.probability || 0}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {row.probability || 0}%
        </span>
      </div>
    ),
  },
  {
    key: "forecastCloseDate",
    label: "Forecast Close Date",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleDateString() : "-",
  },
  {
    key: "value",
    label: "Opportunity Value",
    sortable: true,
    render: (value: string) => `USD $${value || "0.00"}`,
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => (
      <Badge
        variant={
          value === "CLOSED" ? "default" : 
          value === "OPEN" ? "secondary" : "outline"
        }
      >
        {value}
      </Badge>
    ),
  },
];

export function Opportunities() {
  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["/api/opportunities"],
    queryFn: api.opportunities.list,
  });

  return (
    <MainLayout 
      title="All Opportunities" 
      subtitle="Track and manage your sales opportunities and pipeline"
    >
      <div className="p-6">
        <DataTable
          title="Opportunity Pipeline"
          columns={opportunityColumns}
          data={opportunities}
          isLoading={isLoading}
          emptyMessage="No opportunities found. Create your first opportunity to get started."
          searchPlaceholder="Search opportunities..."
        />
      </div>
    </MainLayout>
  );
}
