import React, { createContext, useState, useContext } from "react";
import { Appearance } from "react-native";
import { colors } from "../styles/colorSchemes"

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemTheme || "dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const fonts = {
    regular: "JetBrainsMono-Regular",
    bold: "JetBrainsMono-Bold",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fonts, style: colors[`${theme}`] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
