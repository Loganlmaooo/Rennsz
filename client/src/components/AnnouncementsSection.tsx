import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { formatDate, timeAgo } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAnimationOnScroll } from "@/lib/animation";
import { sendAnnouncementInteractionLog } from "@/lib/discord";

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  createdAt: string;
}

function getCategoryColor(category: string) {
  const categoryColors: Record<string, string> = {
    'event': 'bg-primary text-black',
    'stream': 'bg-blue-500',
    'important': 'bg-red-500',
    'general': 'bg-purple-500',
  };
  
  return categoryColors[category] || 'bg-gray-500';
}

function getCategoryIcon(category: string) {
  const categoryIcons: Record<string, string> = {
    'event': 'calendar-day',
    'stream': 'video',
    'important': 'exclamation-circle',
    'general': 'bullhorn',
  };
  
  return categoryIcons[category] || 'info-circle';
}

export default function AnnouncementsSection() {
  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/announcements");
      return res.json();
    }
  });
  
  // Use useEffect to log announcement views after successful data fetch
  useEffect(() => {
    if (announcements && announcements.length > 0) {
      sendAnnouncementInteractionLog("view", 0, "Announcements Section");
    }
  }, [announcements]);
  
  const pinnedAnnouncement = announcements.find((a: Announcement) => a.isPinned);
  const regularAnnouncements = announcements
    .filter((a: Announcement) => !a.isPinned)
    .slice(0, 3);
    
  // Function to handle clicking on an announcement
  const handleAnnouncementClick = (announcement: Announcement) => {
    sendAnnouncementInteractionLog("click", announcement.id, announcement.title);
  };
  
  // Create all animation hooks upfront
  const headerAnimation = useAnimationOnScroll({
    type: "fade",
    delay: 100,
  });
  
  const pinnedAnimation = useAnimationOnScroll({
    type: "fade",
    delay: 200,
  });
  
  // Pre-create animation hooks for regular announcements
  const announcement1Animation = useAnimationOnScroll({
    type: "fade",
    delay: 300,
  });
  
  const announcement2Animation = useAnimationOnScroll({
    type: "fade",
    delay: 400,
  });
  
  const announcement3Animation = useAnimationOnScroll({
    type: "fade",
    delay: 500,
  });
  
  // Array of announcement animations for easy access
  const announcementAnimations = [
    announcement1Animation,
    announcement2Animation,
    announcement3Animation,
  ];
  
  return (
    <section id="announcements" className="py-10 md:py-16 bg-black/50">
      <div className="container mx-auto px-4">
        <h2 
          ref={headerAnimation.ref}
          className={`text-3xl font-bold mb-8 text-center ${headerAnimation.animationClass}`}
        >
          <span className="gold-gradient bg-clip-text text-transparent">Announcements</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loading State */}
          {isLoading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && announcements.length === 0 && (
            <div className="col-span-full glass rounded-xl p-8 text-center">
              <i className="fas fa-bell-slash text-4xl text-gray-500 mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">No Announcements Yet</h3>
              <p className="text-gray-400">Check back soon for updates from RENNSZ</p>
            </div>
          )}
          
          {/* Pinned Announcement */}
          {pinnedAnnouncement && (
            <div 
              ref={pinnedAnimation.ref}
              className={`glass-gold rounded-xl overflow-hidden col-span-full md:col-span-2 lg:col-span-3 hover-gold ${pinnedAnimation.animationClass} cursor-pointer transition-transform transform-gpu hover:scale-[1.01]`}
              onClick={() => handleAnnouncementClick(pinnedAnnouncement)}
              role="button"
              tabIndex={0}
              aria-label={`Read announcement: ${pinnedAnnouncement.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAnnouncementClick(pinnedAnnouncement);
                }
              }}
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center flex-wrap">
                      <span className="text-primary mr-2">
                        <i className="fas fa-thumbtack"></i>
                      </span>
                      <h3 className="text-xl font-bold">{pinnedAnnouncement.title}</h3>
                    </div>
                    <p className="text-sm text-primary/90 mt-1">
                      Posted {formatDate(pinnedAnnouncement.createdAt)}
                    </p>
                  </div>
                  <Badge className={`${getCategoryColor(pinnedAnnouncement.category)} mt-1 sm:mt-0`}>
                    <i className={`fas fa-${getCategoryIcon(pinnedAnnouncement.category)} mr-1`}></i>
                    {pinnedAnnouncement.category}
                  </Badge>
                </div>
                <p className="text-gray-300">{pinnedAnnouncement.content}</p>
              </div>
            </div>
          )}
          
          {/* Regular Announcements */}
          {regularAnnouncements.map((announcement: Announcement, index: number) => {
            // Use the pre-created animation hook for this index (or the last one if we have more announcements than hooks)
            const animationIndex = Math.min(index, announcementAnimations.length - 1);
            const announcementAnimation = announcementAnimations[animationIndex];
            
            return (
              <div 
                key={announcement.id}
                ref={announcementAnimation.ref}
                className={`glass rounded-xl overflow-hidden hover-gold ${announcementAnimation.animationClass} cursor-pointer transition-transform transform-gpu hover:scale-[1.01]`}
                onClick={() => handleAnnouncementClick(announcement)}
                role="button"
                tabIndex={0}
                aria-label={`Read announcement: ${announcement.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAnnouncementClick(announcement);
                  }
                }}
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{announcement.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {timeAgo(announcement.createdAt)}
                      </p>
                    </div>
                    <Badge className={`${getCategoryColor(announcement.category)} mt-1 sm:mt-0 whitespace-nowrap`}>
                      <i className={`fas fa-${getCategoryIcon(announcement.category)} mr-1 hidden sm:inline`}></i>
                      {announcement.category}
                    </Badge>
                  </div>
                  <p className="text-gray-300 line-clamp-3">{announcement.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {announcements.length > 4 && (
          <div className="text-center mt-8 animate-fadeInUp" style={{ animationDelay: "500ms" }}>
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-4 py-2 h-auto"
              onClick={() => {
                sendAnnouncementInteractionLog("click", 0, "View All Announcements");
              }}
            >
              <span className="flex items-center justify-center">
                View All Announcements <i className="fas fa-arrow-right ml-2"></i>
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
