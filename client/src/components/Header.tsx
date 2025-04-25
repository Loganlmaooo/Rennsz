import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useAdmin();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "glass-gold sticky top-0 z-40 transition-all duration-300",
      scrolled ? "py-2" : "py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary animate-fadeInLeft">RENNSZ</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1 animate-fadeInRight">
            <a href="#hero" className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors">Home</a>
            <a href="#announcements" className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors">Announcements</a>
            <a href="#socials" className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors">Social</a>
            <button 
              onClick={onAdminClick} 
              className="px-4 py-2 rounded-md text-primary hover:bg-primary/10 transition-colors"
            >
              <i className="fas fa-lock mr-1"></i> 
              {isLoggedIn ? "Admin Panel" : "Admin"}
            </button>
          </nav>
          
          <button 
            className="md:hidden text-primary" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4 animate-fadeIn`}>
          <nav className="flex flex-col space-y-2">
            <a 
              href="#hero" 
              className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#announcements" 
              className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Announcements
            </a>
            <a 
              href="#streams" 
              className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Streams
            </a>
            <a 
              href="#socials" 
              className="px-4 py-2 rounded-md text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Social
            </a>
            <button 
              onClick={() => {
                onAdminClick();
                setIsMobileMenuOpen(false);
              }} 
              className="px-4 py-2 rounded-md text-left text-primary hover:bg-primary/10 transition-colors"
            >
              <i className="fas fa-lock mr-1"></i> 
              {isLoggedIn ? "Admin Panel" : "Admin"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
