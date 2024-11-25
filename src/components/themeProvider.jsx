import React, { createContext, useState, useContext } from "react";
import { dark, light } from "../styles/colorSchemes";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const styles = theme === "dark" ? dark : light;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};
