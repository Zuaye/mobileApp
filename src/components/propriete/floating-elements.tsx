import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function FloatingElements() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effet pour éviter les problèmes d'hydratation avec next-themes
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }

  const accentColor = theme === 'dark' ? "#f5a742" : "#f39200";
  const opacityLevel = theme === 'dark' ? "opacity-15" : "opacity-10";
  
  return (
    <>
      <div className={`absolute top-20 left-10 w-20 h-20 ${opacityLevel} animate-pulse`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke={accentColor} strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke={accentColor} strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="20" stroke={accentColor} strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className={`absolute bottom-20 right-10 w-32 h-32 ${opacityLevel} animate-pulse`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,50 L50,10 L90,50 L50,90 Z" stroke={accentColor} strokeWidth="2" fill="none" />
          <path d="M30,50 L50,30 L70,50 L50,70 Z" stroke={accentColor} strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="10" stroke={accentColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </>
  )
}
