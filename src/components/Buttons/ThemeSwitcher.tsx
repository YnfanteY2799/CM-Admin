"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeSwitcher(): ReactNode {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => setTheme((old) => (old === "light" ? "dark" : "light"));

  return (
    <button onClick={toggleTheme} className={"rounded-full flex items-center justify-center transition-colors duration-300"}>
      <motion.div animate={{ rotate: isDark ? 0 : 360 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
        {isDark ? <Moon className="text-primary" /> : <Sun className="text-primary" />}
      </motion.div>
    </button>
  );
}
