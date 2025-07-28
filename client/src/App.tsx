import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import NotFound from "./pages/not-found";

// Import all pages
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Contacts } from "./pages/Contacts";
import { Leads } from "./pages/Leads";
import { Organizations } from "./pages/Organizations";
import { Opportunities } from "./pages/Opportunities";
import { Projects } from "./pages/Projects";
import { Time } from "./pages/Time";
import { Emails } from "./pages/Emails";
import { Calendar } from "./pages/Calendar";
import { Reports } from "./pages/Reports";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/leads" component={Leads} />
      <Route path="/organizations" component={Organizations} />
      <Route path="/opportunities" component={Opportunities} />
      <Route path="/projects" component={Projects} />
      <Route path="/time" component={Time} />
      <Route path="/emails" component={Emails} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/reports" component={Reports} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {/* <Toaster /> */}
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
