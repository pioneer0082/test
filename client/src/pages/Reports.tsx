import { MainLayout } from "../components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FileText, BarChart3, TrendingUp, Users, Target, DollarSign } from "lucide-react";

export function Reports() {
  const reportCategories = [
    {
      title: "Sales Reports",
      icon: DollarSign,
      reports: [
        { name: "Sales Pipeline Report", description: "Track opportunities through your sales funnel", status: "active" },
        { name: "Revenue Forecast", description: "Predict future revenue based on current pipeline", status: "active" },
        { name: "Sales Rep Performance", description: "Compare individual sales representative results", status: "active" },
        { name: "Win/Loss Analysis", description: "Analyze reasons for won and lost opportunities", status: "active" },
      ]
    },
    {
      title: "Contact Reports",
      icon: Users,
      reports: [
        { name: "Contact Activity Report", description: "See recent contact interactions and communications", status: "active" },
        { name: "Lead Source Analysis", description: "Track where your best leads are coming from", status: "active" },
        { name: "Contact Segmentation", description: "Group contacts by various criteria", status: "draft" },
      ]
    },
    {
      title: "Project Reports",
      icon: Target,
      reports: [
        { name: "Project Status Overview", description: "Get a high-level view of all project statuses", status: "active" },
        { name: "Time Tracking Summary", description: "Analyze time spent across projects and tasks", status: "active" },
        { name: "Project Profitability", description: "Calculate ROI and profitability by project", status: "draft" },
      ]
    },
    {
      title: "Performance Reports",
      icon: TrendingUp,
      reports: [
        { name: "Monthly Performance Dashboard", description: "Key metrics and KPIs for the month", status: "active" },
        { name: "Team Productivity Report", description: "Track team performance and efficiency", status: "active" },
        { name: "Goal Achievement Tracking", description: "Monitor progress towards set goals", status: "draft" },
      ]
    }
  ];

  return (
    <MainLayout 
      title="Reports & Analytics" 
      subtitle="Generate insights and track performance across your CRM"
    >
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">18</div>
                  <div className="text-sm text-muted-foreground">Active Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">6</div>
                  <div className="text-sm text-muted-foreground">Scheduled Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Shared Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="space-y-6">
          {reportCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="w-6 h-6 mr-3 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {category.reports.map((report, reportIndex) => (
                      <div
                        key={reportIndex}
                        className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{report.name}</h4>
                          <Badge
                            variant={report.status === "active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {report.description}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            View Report
                          </Button>
                          <Button size="sm" variant="ghost">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Generated Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No recent reports generated</p>
              <p className="text-sm mt-2">Generated reports will appear here for quick access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
