import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

Chart.register(...registerables);

interface ChartWidgetProps {
  title: string;
  value: string;
  description: string;
  chartType: "bar" | "doughnut" | "line";
  data: any;
  options?: any;
  height?: string;
}

function ChartWidget({ title, value, description, chartType, data, options, height = "h-48" }: ChartWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new Chart(canvasRef.current, {
      type: chartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: chartType === "doughnut",
            position: "bottom" as const,
          },
        },
        ...options,
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartType, data, options]);

  return (
    <Card className="bg-card dark:bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-2">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className={`chart-container ${height}`}>
          <canvas ref={canvasRef} />
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardCharts() {
  const topSalesData = {
    labels: ["Rep A", "Rep B", "Rep C", "Rep D", "Rep E"],
    datasets: [
      {
        data: [85, 72, 68, 45, 42],
        backgroundColor: "hsl(var(--chart-1))",
        borderRadius: 4,
      },
    ],
  };

  const funnelData = {
    labels: ["Lead", "Qualified", "Proposal", "Negotiation", "Closed"],
    datasets: [
      {
        data: [100, 75, 50, 30, 20],
        backgroundColor: [
          "hsl(var(--chart-1))",
          "hsl(var(--chart-2))",
          "hsl(var(--chart-3))",
          "hsl(var(--chart-4))",
          "hsl(var(--chart-5))",
        ],
        borderRadius: 4,
      },
    ],
  };

  const gaugeData = {
    datasets: [
      {
        data: [2.48, 2.52],
        backgroundColor: ["hsl(var(--primary))", "hsl(var(--muted))"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const pieData = {
    labels: ["California", "New York", "Texas", "Florida", "Others"],
    datasets: [
      {
        data: [8, 5, 3, 2, 2],
        backgroundColor: [
          "hsl(var(--chart-1))",
          "hsl(var(--chart-2))",
          "hsl(var(--chart-3))",
          "hsl(var(--chart-4))",
          "hsl(var(--chart-5))",
        ],
        borderWidth: 0,
      },
    ],
  };

  const salesByRepData = {
    labels: ["Samir Barker", "Alice Johnson", "Bob Smith", "Carol Davis", "Dave Wilson"],
    datasets: [
      {
        data: [850, 720, 680, 450, 420],
        backgroundColor: "hsl(var(--primary))",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "hsl(var(--border))" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const horizontalChartOptions = {
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "hsl(var(--border))" },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <ChartWidget
        title="Top Sales Reps"
        value="$354.57K"
        description="Average Sales Size"
        chartType="bar"
        data={topSalesData}
        options={chartOptions}
      />

      <ChartWidget
        title="Sales Pipeline Funnel"
        value="$2.35M"
        description="Sum of Opportunity Value"
        chartType="bar"
        data={funnelData}
        options={horizontalChartOptions}
      />

      <ChartWidget
        title="Total Sales"
        value="$2.48M"
        description="Sum of Total Sales Value"
        chartType="doughnut"
        data={gaugeData}
        options={{
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          cutout: "75%",
        }}
      />

      <ChartWidget
        title="Number of Opps by State"
        value="20"
        description="Count of Number of Opportunities"
        chartType="doughnut"
        data={pieData}
        options={{ cutout: "50%" }}
      />

      <ChartWidget
        title="Sales Pipeline Weighted"
        value="$367.20K"
        description="Sum of Expected Revenue"
        chartType="bar"
        data={{
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              data: [120, 95, 85, 67],
              backgroundColor: "hsl(var(--chart-2))",
              borderRadius: 4,
            },
          ],
        }}
        options={chartOptions}
      />

      <ChartWidget
        title="Lost Opportunities by Reason"
        value="3"
        description="Number of Lost Opportunities"
        chartType="doughnut"
        data={{
          labels: ["Price", "Timeline", "Features"],
          datasets: [
            {
              data: [1, 1, 1],
              backgroundColor: [
                "hsl(var(--destructive))",
                "hsl(var(--chart-3))",
                "hsl(var(--chart-4))",
              ],
              borderWidth: 0,
            },
          ],
        }}
        options={{ cutout: "50%" }}
      />

      {/* Win Rate Widget */}
      <Card className="bg-card dark:bg-card border-border lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Win Rate</CardTitle>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">58.33%</div>
            <CardDescription>Sum of Win Rate</CardDescription>
            <div className="mt-4">
              <div className="text-2xl font-bold text-foreground">$2.48M</div>
              <CardDescription>Sum of Opportunity Value</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales by Rep Widget - spans 2 columns */}
      <div className="lg:col-span-2">
        <ChartWidget
          title="Total Sales by Rep"
          value="$2.48M"
          description="Sum of Opportunity Value"
          chartType="bar"
          data={salesByRepData}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
