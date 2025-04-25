import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import Dashboard from "./Dashboard";
import Announcements from "./Announcements";
import StreamSettings from "./StreamSettings";
import Themes from "./Themes";
import Logs from "./Logs";
import { sendAdminActionLog } from "@/lib/discord";

type AdminTab = "dashboard" | "announcements" | "streams" | "themes" | "logs";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const { logout } = useAdmin();
  
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    sendAdminActionLog("Tab Navigation", `Navigated to ${tab} tab`);
  };
  
  const handleLogout = () => {
    logout();
    sendAdminActionLog("Logout", "Admin logged out");
  };
  
  useEffect(() => {
    // Prevent body scrolling when admin panel is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/80 animate-fadeIn">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-zinc-900 border-r border-primary/20 flex-shrink-0">
          <div className="p-4 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-primary">ADMIN PANEL</h2>
              <button 
                onClick={logout}
                className="text-gray-400 hover:text-primary"
                aria-label="Close admin panel"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleTabChange("dashboard")}
                  className={`w-full text-left py-2 px-3 rounded hover:bg-zinc-800 text-primary hover-gold ${
                    activeTab === "dashboard" ? "nav-active bg-zinc-800" : ""
                  }`}
                >
                  <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange("announcements")}
                  className={`w-full text-left py-2 px-3 rounded hover:bg-zinc-800 text-primary hover-gold ${
                    activeTab === "announcements" ? "nav-active bg-zinc-800" : ""
                  }`}
                >
                  <i className="fas fa-bullhorn mr-2"></i> Announcements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange("streams")}
                  className={`w-full text-left py-2 px-3 rounded hover:bg-zinc-800 text-primary hover-gold ${
                    activeTab === "streams" ? "nav-active bg-zinc-800" : ""
                  }`}
                >
                  <i className="fas fa-video mr-2"></i> Stream Settings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange("themes")}
                  className={`w-full text-left py-2 px-3 rounded hover:bg-zinc-800 text-primary hover-gold ${
                    activeTab === "themes" ? "nav-active bg-zinc-800" : ""
                  }`}
                >
                  <i className="fas fa-paint-brush mr-2"></i> Themes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange("logs")}
                  className={`w-full text-left py-2 px-3 rounded hover:bg-zinc-800 text-primary hover-gold ${
                    activeTab === "logs" ? "nav-active bg-zinc-800" : ""
                  }`}
                >
                  <i className="fas fa-list mr-2"></i> Logs
                </button>
              </li>
              <li className="pt-4 mt-4 border-t border-primary/20">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 rounded hover:bg-red-900/50 text-red-400"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow bg-zinc-950 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "announcements" && <Announcements />}
          {activeTab === "streams" && <StreamSettings />}
          {activeTab === "themes" && <Themes />}
          {activeTab === "logs" && <Logs />}
        </div>
      </div>
    </div>
  );
}
