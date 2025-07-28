import { MainLayout } from "../components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";

export function Calendar() {
  const today = new Date();
  const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Sales Team Meeting",
      date: "2025-07-28",
      time: "10:00 AM",
      location: "Conference Room A",
      attendees: 5,
      type: "meeting"
    },
    {
      id: 2,
      title: "Client Presentation - Globex",
      date: "2025-07-29",
      time: "2:00 PM",
      location: "Online",
      attendees: 3,
      type: "presentation"
    },
    {
      id: 3,
      title: "Follow-up Call - Nakatomi Trading",
      date: "2025-07-30",
      time: "11:30 AM",
      location: "Phone",
      attendees: 2,
      type: "call"
    }
  ];

  return (
    <MainLayout 
      title="Calendar" 
      subtitle="Manage your schedule and upcoming events"
    >
      <div className="p-6 space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{currentMonth}</h2>
          <div className="flex space-x-2">
            <Button variant="outline">Today</Button>
            <Button variant="outline">Week</Button>
            <Button variant="default">Month</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mini Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Quick Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6; // Adjust for calendar start
                  const isToday = day === today.getDate();
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-md cursor-pointer hover:bg-muted ${
                        isToday ? 'bg-primary text-primary-foreground' : ''
                      } ${day < 1 || day > 31 ? 'text-muted-foreground/50' : ''}`}
                    >
                      {day > 0 && day <= 31 ? day : ''}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.attendees}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendar Grid View */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-12">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Interactive calendar view would be implemented here</p>
              <p className="text-sm mt-2">This would show a full month/week/day calendar interface</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
