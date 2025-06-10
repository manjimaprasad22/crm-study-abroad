
import { Button } from "@/components/ui/button";
import { Globe, LayoutDashboard, Users, UserPlus, CheckSquare, BarChart3, Settings, Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }: SidebarProps) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: Users },
    { id: "capture", label: "Capture Lead", icon: UserPlus },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">StudyConnect</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              !isOpen && "px-2",
              activeSection === item.id && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            onClick={() => setActiveSection(item.id)}
          >
            <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
            {isOpen && item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};
