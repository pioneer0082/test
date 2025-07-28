import { MainLayout } from "../components/Layout/MainLayout";
import { DashboardCharts } from "../components/Charts/DashboardCharts";
import { SalesTargetGauge } from "../components/Charts/SalesTargetGauge";
import { PerformanceMetrics } from "../components/Charts/PerformanceMetrics";
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
    label: "Value",
    sortable: true,
    render: (value: string) => `USD $${value || "0"}`,
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

export function Dashboard() {
  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["/api/opportunities"],
    queryFn: api.opportunities.list,
  });

  // Calculate performance metrics from real data
  const performanceData = {
    totalRevenue: opportunities.reduce((sum: number, opp: Opportunity) => sum + (parseFloat(opp.value || '0') || 0), 0),
    revenueChange: 12.5,
    activeDeals: opportunities.filter((opp: Opportunity) => opp.status === 'OPEN').length,
    dealsChange: 8.2,
    conversionRate: opportunities.length > 0 
      ? Math.round((opportunities.filter((opp: Opportunity) => opp.status === 'CLOSED').length / opportunities.length) * 100)
      : 0,
    conversionChange: 5.1,
    avgDealSize: opportunities.length > 0 
      ? opportunities.reduce((sum: number, opp: Opportunity) => sum + (parseFloat(opp.value || '0') || 0), 0) / opportunities.length
      : 0,
    dealSizeChange: -2.3
  };

  const currentSales = performanceData.totalRevenue;
  const targetSales = 3000000; // $3M target

  return (
    <MainLayout 
      title="CRM Dashboard" 
      subtitle="Track your sales pipeline and performance metrics"
    >
      <div className="p-6 space-y-8">
        {/* Performance Metrics */}
        <PerformanceMetrics data={performanceData} />

        {/* Sales Target Gauge and Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SalesTargetGauge 
              currentSales={currentSales}
              targetSales={targetSales}
              period="This Quarter"
            />
          </div>
          <div className="lg:col-span-2">
            <DashboardCharts />
          </div>
        </div>

        {/* Recent Opportunities Table */}
        <DataTable
          title="Recent Opportunities"
          columns={opportunityColumns}
          data={opportunities}
          isLoading={isLoading}
          emptyMessage="No opportunities found. Create your first opportunity to get started."
          searchPlaceholder="Search opportunities..."
          onRefresh={() => window.location.reload()}
        />
      </div>
    </MainLayout>
  );
}
