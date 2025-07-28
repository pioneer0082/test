import { MainLayout } from "../components/Layout/MainLayout";
import { SalesTargetGauge } from "../components/Charts/SalesTargetGauge";
import { PerformanceMetrics } from "../components/Charts/PerformanceMetrics";
import { DashboardCharts } from "../components/Charts/DashboardCharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { CalendarDays, Users, Target, TrendingUp, Plus, ArrowRight } from "lucide-react";
import type { Opportunity, Task, Contact, Lead } from "../../../shared/schema";

export function Home() {
  const { data: opportunities = [] } = useQuery({
    queryKey: ["/api/opportunities"],
    queryFn: api.opportunities.list,
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: api.tasks.list,
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["/api/contacts"],
    queryFn: api.contacts.list,
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["/api/leads"],
    queryFn: api.leads.list,
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

  // Get upcoming tasks (next 5)
  const upcomingTasks = tasks
    .filter((task: Task) => task.status !== 'COMPLETED')
    .sort((a: Task, b: Task) => new Date(a.dueDate || '2099-12-31').getTime() - new Date(b.dueDate || '2099-12-31').getTime())
    .slice(0, 5);

  // Get recent opportunities (last 5)
  const recentOpportunities = opportunities
    .sort((a: Opportunity, b: Opportunity) => new Date(b.createdAt || '1970-01-01').getTime() - new Date(a.createdAt || '1970-01-01').getTime())
    .slice(0, 5);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <MainLayout 
      title="Welcome to CRM Dashboard" 
      subtitle="Your business overview and key metrics at a glance"
    >
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="gradient-bg rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-white/90">Here's what's happening with your business today.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{formatCurrency(currentSales)}</div>
              <div className="text-white/90">Total Revenue</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics data={performanceData} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Target Gauge */}
          <div className="lg:col-span-1">
            <SalesTargetGauge 
              currentSales={currentSales}
              targetSales={targetSales}
              period="This Quarter"
            />
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contacts.length}</div>
                <p className="text-xs text-muted-foreground">+2 new this week</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads.length}</div>
                <p className="text-xs text-muted-foreground">+5 new this week</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingTasks.length}</div>
                <p className="text-xs text-muted-foreground">Due this week</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">+5.1% from last quarter</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <DashboardCharts />

        {/* Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Your next 5 tasks to complete</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task: Task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(task.priority || 'low') as any}>
                        {task.priority || 'Low'}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No upcoming tasks</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Opportunities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Opportunities</CardTitle>
                <CardDescription>Latest deals in your pipeline</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Opportunity
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOpportunities.length > 0 ? (
                recentOpportunities.map((opp: Opportunity) => (
                  <div key={opp.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{opp.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(parseFloat(opp.value || '0') || 0)} • {opp.probability || 0}% probability
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={opp.status === 'OPEN' ? 'secondary' : 'default'}>
                        {opp.status}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No recent opportunities</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}