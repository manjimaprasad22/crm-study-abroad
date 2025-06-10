
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { LeadList } from "@/components/dashboard/LeadList";
import { LeadCapture } from "@/components/dashboard/LeadCapture";
import { TaskManager } from "@/components/dashboard/TaskManager";
import { Reports } from "@/components/dashboard/Reports";
import { Settings } from "@/components/dashboard/Settings";
import { LeadDetail } from "@/components/dashboard/LeadDetail";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardProps {
  initialSection?: string;
}

const Dashboard = ({ initialSection = "overview" }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { leadId } = useParams();

  // Additional security check to ensure user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Set active section based on current route
  useEffect(() => {
    if (initialSection === "lead-detail" && leadId) {
      setActiveSection("lead-detail");
    } else if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection, leadId]);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "leads":
        return <LeadList />;
      case "capture":
        return <LeadCapture />;
      case "tasks":
        return <TaskManager />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "lead-detail":
        return <LeadDetail />;
      default:
        return <DashboardOverview />;
    }
  };

  // Don't render anything until we know the user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
