import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { THEMES, Theme, ThemeName, applyTheme } from "@/lib/theme";
import { apiRequest } from "@/lib/queryClient";

interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Theme) => void;
  availableThemes: Record<Exclude<ThemeName, "custom">, Theme>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.default,
  updateTheme: () => {},
  availableThemes: THEMES,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(THEMES.default);
  
  // Fetch current theme from API
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await apiRequest("GET", "/api/theme");
        const data = await res.json();
        
        if (data && data.theme) {
          const themeKey = data.theme as ThemeName;
          
          if (themeKey === "custom" && data.customTheme) {
            // Apply custom theme
            const customTheme: Theme = {
              name: "custom",
              label: "Custom Theme",
              darkMode: true,
              cssClass: "theme-custom",
              colors: {
                primary: data.customTheme.primaryColor || "#D4AF37",
                secondary: data.customTheme.secondaryColor || "#2A2A2A",
                accent: data.customTheme.accentColor || "#D4AF37",
                background: data.customTheme.backgroundColor || "#121212",
                text: data.customTheme.textColor || "#FFFFFF",
              },
              backgroundImage: data.customTheme.backgroundImage,
              specialEffects: ["glassReflection"],
            };
            
            setTheme(customTheme);
            applyTheme(customTheme);
          } else if (themeKey in THEMES) {
            // Apply predefined theme
            setTheme(THEMES[themeKey]);
            applyTheme(THEMES[themeKey]);
          }
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
        // Default to standard theme
        setTheme(THEMES.default);
        applyTheme(THEMES.default);
      }
    };
    
    fetchTheme();
  }, []);
  
  // Update theme
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    
    // Persist the theme to server
    const saveTheme = async () => {
      try {
        await apiRequest("POST", "/api/theme", { 
          theme: newTheme.name,
          customTheme: newTheme.name === "custom" ? {
            primaryColor: newTheme.colors.primary,
            secondaryColor: newTheme.colors.secondary,
            accentColor: newTheme.colors.accent,
            backgroundColor: newTheme.colors.background,
            textColor: newTheme.colors.text,
            backgroundImage: newTheme.backgroundImage,
          } : undefined,
        });
      } catch (error) {
        console.error("Error saving theme:", error);
      }
    };
    
    saveTheme();
  };
  
  const value = {
    theme,
    updateTheme,
    availableThemes: THEMES,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
