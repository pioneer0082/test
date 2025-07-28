import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Clock } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  prefix?: string;
}

function MetricCard({ title, value, change, changeLabel, icon, prefix = "" }: MetricCardProps) {
  const isPositive = change > 0;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {prefix}{value}
        </div>
        <div className="flex items-center text-xs mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-muted-foreground ml-1">
            {changeLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

interface PerformanceMetricsProps {
  data: {
    totalRevenue: number;
    revenueChange: number;
    activeDeals: number;
    dealsChange: number;
    conversionRate: number;
    conversionChange: number;
    avgDealSize: number;
    dealSizeChange: number;
  };
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        value={formatCurrency(data.totalRevenue)}
        change={data.revenueChange}
        changeLabel="from last quarter"
        icon={<DollarSign />}
        prefix="$"
      />
      
      <MetricCard
        title="Active Deals"
        value={data.activeDeals.toString()}
        change={data.dealsChange}
        changeLabel="from last month"
        icon={<Target />}
      />
      
      <MetricCard
        title="Conversion Rate"
        value={`${data.conversionRate}%`}
        change={data.conversionChange}
        changeLabel="from last quarter"
        icon={<TrendingUp />}
      />
      
      <MetricCard
        title="Avg Deal Size"
        value={formatCurrency(data.avgDealSize)}
        change={data.dealSizeChange}
        changeLabel="from last quarter"
        icon={<Users />}
        prefix="$"
      />
    </div>
  );
}