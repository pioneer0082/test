import { Search, Sun, Moon, Bell, HelpCircle, User, Filter, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTheme } from "../../contexts/ThemeContext";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showActions?: boolean;
}

export function Header({ title = "Opportunities Dashboard", subtitle = "Track your sales pipeline and performance metrics", showActions = true }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Top Header Bar */}
      <header className="gradient-bg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="bg-white/10 text-white border-white/20 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search all data"
              className="bg-white/10 text-white placeholder-white/60 border-white/20 rounded-lg pl-10 pr-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-white">
              <div className="text-sm font-medium">Samir Barker</div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-background dark:bg-background px-6 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          </div>
          {showActions && (
            <div className="flex space-x-3">
              <Button variant="outline" className="text-muted-foreground">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Actions
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
