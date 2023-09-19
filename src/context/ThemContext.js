"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const handleStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState();

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    const value = handleStorage();
    setTheme(value);
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
