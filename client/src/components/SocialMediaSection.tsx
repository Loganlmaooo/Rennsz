import { Card, CardContent } from "@/components/ui/card";
import { useAnimationOnScroll } from "@/lib/animation";
import { sendSocialMediaInteractionLog } from "@/lib/discord";

export default function SocialMediaSection() {
  const headerAnimation = useAnimationOnScroll({
    type: "fade",
    delay: 100,
  });
  
  const discordAnimation = useAnimationOnScroll({
    type: "fade",
    direction: "up",
    delay: 200,
  });
  
  const twitterAnimation = useAnimationOnScroll({
    type: "fade",
    direction: "up",
    delay: 300,
  });
  
  const instagramAnimation = useAnimationOnScroll({
    type: "fade",
    direction: "up",
    delay: 400,
  });
  
  const feedAnimation = useAnimationOnScroll({
    type: "fade",
    delay: 500,
  });
  
  return (
    <section id="socials" className="py-10 md:py-16 bg-black/50">
      <div className="container mx-auto px-4">
        <h2 
          ref={headerAnimation.ref}
          className={`text-3xl font-bold mb-8 text-center ${headerAnimation.animationClass}`}
        >
          <span className="gold-gradient bg-clip-text text-transparent">Connect with RENNSZ</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Discord */}
          <div 
            ref={discordAnimation.ref}
            className={`glass rounded-xl overflow-hidden hover-gold ${discordAnimation.animationClass}`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#5865F2] flex items-center justify-center">
                  <i className="fab fa-discord text-2xl text-white"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Discord Server</h3>
                  <p className="text-sm text-gray-400">Join the community</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">Connect with other fans, get stream notifications, and participate in community events.</p>
              <a 
                href="https://discord.gg/hUTXCaSdKC" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-md bg-[#5865F2] text-white font-bold hover:bg-opacity-90 transition"
              >
                Join Discord
              </a>
            </div>
          </div>
          
          {/* Twitter/X */}
          <div 
            ref={twitterAnimation.ref}
            className={`glass rounded-xl overflow-hidden hover-gold ${twitterAnimation.animationClass}`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                  <i className="fab fa-x-twitter text-2xl text-white"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">X (Twitter)</h3>
                  <p className="text-sm text-gray-400">Follow for updates</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">Get the latest updates, stream announcements, and behind-the-scenes content.</p>
              <div className="space-y-2">
                <a 
                  href="https://x.com/rennsz96?s=21" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-md bg-black border border-gray-700 text-white font-bold hover:bg-gray-900 transition"
                >
                  Follow @rennsz96
                </a>
                <a 
                  href="https://x.com/i/communities/1823168507401634218" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 ml-2 rounded-md bg-black border border-gray-700 text-white hover:bg-gray-900 transition text-sm"
                >
                  Join Community
                </a>
              </div>
            </div>
          </div>
          
          {/* Instagram */}
          <div 
            ref={instagramAnimation.ref}
            className={`glass rounded-xl overflow-hidden hover-gold ${instagramAnimation.animationClass}`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center">
                  <i className="fab fa-instagram text-2xl text-white"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Instagram</h3>
                  <p className="text-sm text-gray-400">Photos & Stories</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">Follow for photos, stories, and visual highlights from streams and events.</p>
              <a 
                href="https://www.instagram.com/rennsz?igsh=MWhjYjg2ZDV4dHc0bw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-md bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 text-white font-bold hover:opacity-90 transition"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
        
        {/* Social Feed */}
        <div 
          ref={feedAnimation.ref}
          className={`mt-12 ${feedAnimation.animationClass}`}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Latest Updates</h3>
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Twitter Post */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-black flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=96&q=80" 
                        alt="RENNSZ Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold text-white">RENNSZ <span className="text-gray-400 font-normal">@rennsz96</span></p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm">Going live in 30 minutes for some IRL exploration! Can't wait to show you all the amazing spots I found today. #RLSQUAD #TwitchStreamers</p>
                  <div className="flex justify-end mt-3">
                    <a 
                      href="https://x.com/rennsz96?s=21" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400"
                    >
                      <i className="fab fa-x-twitter"></i>
                    </a>
                  </div>
                </div>
                
                {/* Instagram Post */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=96&q=80" 
                        alt="RENNSZ Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold text-white">rennsz</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80" 
                      alt="City View" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <p className="text-gray-200 text-sm">Found this amazing view today! 📸 #StreamerLife</p>
                  <div className="flex justify-end mt-3">
                    <a 
                      href="https://www.instagram.com/rennsz?igsh=MWhjYjg2ZDV4dHc0bw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                
                {/* Discord Update */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 animate-fadeInUp" style={{ animationDelay: "300ms" }}>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#5865F2] flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=96&q=80"
                        alt="RENNSZ Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold text-white">RENNSZ <span className="text-gray-400 font-normal">#announcements</span></p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm">We've added new Discord roles and emotes! Check out the #roles channel to claim your membership badges. Plus, we're planning a special event this weekend!</p>
                  <div className="flex justify-end mt-3">
                    <a 
                      href="https://discord.gg/hUTXCaSdKC" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#5865F2]"
                    >
                      <i className="fab fa-discord"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
