import { MainLayout } from "../components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

export function Time() {
  const currentWeek = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const weekDays = [
    { day: 'Mon', date: '21 Jul', hours: '0h 0m' },
    { day: 'Tue', date: '22 Jul', hours: '0h 0m' },
    { day: 'Wed', date: '23 Jul', hours: '0h 0m' },
    { day: 'Thu', date: '24 Jul', hours: '0h 0m' },
    { day: 'Fri', date: '25 Jul', hours: '0h 0m' },
    { day: 'Sat', date: '26 Jul', hours: '0h 0m' },
    { day: 'Sun', date: '27 Jul', hours: '0h 0m' },
  ];

  return (
    <MainLayout 
      title={`Daily Timesheet - 21 Jul 2025 To 27 Jul 2025`}
      subtitle="Track your time and manage timesheets"
      showActions={false}
    >
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Timesheet</CardTitle>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Time Entry
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4 mb-6">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="font-medium text-foreground">{day.day}</div>
                  <div className="text-sm text-muted-foreground">{day.date}</div>
                  <div className="mt-4 p-4 border border-border rounded-lg bg-muted/50 min-h-[100px]">
                    <div className="text-sm font-medium text-foreground">{day.hours}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Weekly Total: </span>
                  <span className="font-bold text-foreground">0h 0m</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">Day</Button>
                  <Button variant="default">Week</Button>
                  <Button variant="outline">Filter By User</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary">
                  View All Time Reports
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Report Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No recent activity to display
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
