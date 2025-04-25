import { useEffect, useState } from "react";

interface AnimationOptions {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "slide" | "scale" | "rotate";
  ease?: string;
}

export function useAnimationOnScroll(options: AnimationOptions = {}) {
  const {
    delay = 0,
    duration = 600,
    direction = "up",
    type = "fade",
    ease = "ease-out",
  } = options;
  
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);
  
  const getAnimationClass = () => {
    if (!isVisible) return "";
    
    const directionMap = {
      up: "translate-y-8",
      down: "-translate-y-8",
      left: "translate-x-8",
      right: "-translate-x-8",
    };
    
    const animationClass = `transform ${isVisible ? "opacity-100" : "opacity-0"} ${
      type === "slide" ? (isVisible ? "" : directionMap[direction]) : ""
    } ${type === "scale" ? (isVisible ? "" : "scale-95") : ""} ${
      type === "rotate" ? (isVisible ? "" : "rotate-3") : ""
    } transition-all ${ease} duration-${duration} delay-${delay}`;
    
    return animationClass;
  };
  
  return { ref: setRef, isVisible, animationClass: getAnimationClass() };
}

export function usePremiumParticles() {
  useEffect(() => {
    // Implementation would go here in a real app
    // This would integrate with a particle library
    console.log("Premium particles initialized");
    
    return () => {
      console.log("Premium particles destroyed");
    };
  }, []);
}

export function useGlassReflection(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const xPercent = Math.round((x / width) * 100);
      const yPercent = Math.round((y / height) * 100);
      
      element.style.backgroundImage = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)`;
    };
    
    element.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref]);
}

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll(".parallax");
      const scrollY = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(
          (element as HTMLElement).dataset.speed || "0.5"
        );
        (element as HTMLElement).style.transform = `translateY(${
          scrollY * speed
        }px)`;
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

export function useGoldParticles(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    
    // This would integrate with a particle library in a real implementation
    console.log("Gold particles initialized on element");
    
    return () => {
      console.log("Gold particles destroyed");
    };
  }, [ref]);
}

export function useCustomCursor() {
  useEffect(() => {
    // Implementation would go here in a real app
    console.log("Custom cursor initialized");
    
    return () => {
      console.log("Custom cursor destroyed");
    };
  }, []);
}
