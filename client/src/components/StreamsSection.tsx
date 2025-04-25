import { useQuery } from "@tanstack/react-query";
import { getAllStreamersStatus, StreamerInfo } from "@/lib/twitch";
import { Card, CardContent } from "@/components/ui/card";
import { useAnimationOnScroll } from "@/lib/animation";

interface ScheduleDay {
  day: string;
  main?: { time: string } | null;
  gaming?: { time: string } | null;
  special?: string | null;
}

const SCHEDULE: ScheduleDay[] = [
  { day: "Monday", main: { time: "6PM - 10PM EST" }, gaming: null },
  { day: "Tuesday", main: null, gaming: { time: "7PM - 11PM EST" } },
  { day: "Wednesday", main: { time: "6PM - 10PM EST" }, gaming: null },
  { day: "Thursday", main: null, gaming: { time: "7PM - 11PM EST" } },
  { day: "Friday", main: { time: "8PM - 1AM EST" }, gaming: null },
  { day: "Saturday", main: null, gaming: null, special: "Special Events (4PM - 10PM EST)" },
  { day: "Sunday", main: null, gaming: null, special: "Day Off" },
];

export default function StreamsSection() {
  const { data: streamers, isLoading } = useQuery({
    queryKey: ["/api/twitch/streamers"],
    queryFn: getAllStreamersStatus,
  });
  
  const headerAnimation = useAnimationOnScroll({
    type: "fade",
    delay: 100,
  });
  
  const mainChannelAnimation = useAnimationOnScroll({
    type: "fade",
    direction: "left",
    delay: 200,
  });
  
  const gamingChannelAnimation = useAnimationOnScroll({
    type: "fade",
    direction: "right",
    delay: 300,
  });
  
  const scheduleAnimation = useAnimationOnScroll({
    type: "fade",
    delay: 400,
  });
  
  return (
    <section id="streams" className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <h2 
          ref={headerAnimation.ref}
          className={`text-3xl font-bold mb-8 text-center ${headerAnimation.animationClass}`}
        >
          <span className="gold-gradient bg-clip-text text-transparent">Stream Channels</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main IRL Channel */}
          <div 
            ref={mainChannelAnimation.ref}
            className={`glass rounded-xl overflow-hidden hover-gold ${mainChannelAnimation.animationClass}`}
          >
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1502519144081-acca18599776?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="IRL Streaming" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {isLoading ? (
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                    ) : streamers?.main.isLive ? (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                    )}
                    <span className={`ml-2 text-sm font-semibold ${streamers?.main.isLive ? 'text-red-400' : 'text-gray-400'}`}>
                      {isLoading ? 'LOADING' : (streamers?.main.isLive ? 'LIVE' : 'OFFLINE')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">IRL Adventures</h3>
                  <p className="text-gray-300 text-sm mt-1">Exploring the world, one stream at a time</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-primary">Main Channel</h4>
                  <p className="text-sm text-gray-400">Travel, IRL, and Events</p>
                </div>
                <a 
                  href="https://www.twitch.tv/rennsz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-[#6441A4] text-white font-bold hover:bg-opacity-90 transition"
                >
                  <i className="fab fa-twitch mr-1"></i> Watch
                </a>
              </div>
            </div>
          </div>
          
          {/* Gaming Channel */}
          <div 
            ref={gamingChannelAnimation.ref}
            className={`glass rounded-xl overflow-hidden hover-gold ${gamingChannelAnimation.animationClass}`}
          >
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Gaming Stream" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {isLoading ? (
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                    ) : streamers?.gaming.isLive ? (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                    )}
                    <span className={`ml-2 text-sm font-semibold ${streamers?.gaming.isLive ? 'text-red-400' : 'text-gray-400'}`}>
                      {isLoading ? 'LOADING' : (streamers?.gaming.isLive ? 'LIVE' : 'OFFLINE')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">Gaming & Chill</h3>
                  <p className="text-gray-300 text-sm mt-1">Casual gameplay and hangouts</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-primary">Gaming Channel</h4>
                  <p className="text-sm text-gray-400">Games and Chill Content</p>
                </div>
                <a 
                  href="https://www.twitch.tv/rennszino" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-[#6441A4] text-white font-bold hover:bg-opacity-90 transition"
                >
                  <i className="fab fa-twitch mr-1"></i> Watch
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stream Schedule */}
        <div 
          ref={scheduleAnimation.ref}
          className={`mt-12 ${scheduleAnimation.animationClass}`}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Stream Schedule</h3>
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {SCHEDULE.map((day, index) => (
                  <div 
                    key={day.day} 
                    className="glass-gold rounded-lg p-4 text-center animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h4 className="font-bold">{day.day}</h4>
                    <div className="mt-2 text-sm">
                      {day.main && (
                        <div className="mb-2">
                          <p className="font-semibold">IRL Channel</p>
                          <p className="text-gray-400">{day.main.time}</p>
                        </div>
                      )}
                      {day.gaming && (
                        <div className="mb-2">
                          <p className="font-semibold">Gaming Channel</p>
                          <p className="text-gray-400">{day.gaming.time}</p>
                        </div>
                      )}
                      {day.special && (
                        <div className="mb-2">
                          <p className="font-semibold">{day.special.split('(')[0]}</p>
                          <p className="text-gray-400">
                            {day.special.includes('(') ? day.special.split('(')[1].replace(')', '') : 'No Streams'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">* Schedule subject to change. Follow social media for updates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
