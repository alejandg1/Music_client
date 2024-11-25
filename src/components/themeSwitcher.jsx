import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "./themeProvider";

export const ThemeToggleButton = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <MaterialIcons
        name={theme === "dark" ? "light-mode" : "dark-mode"}
        size={24}
        color={styles.icon}
      />
    </TouchableOpacity>
  );
};
