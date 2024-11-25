import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "./themeProvider";
export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <MaterialIcons name="home" size={24} color={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="public" size={24} color={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="library-music" size={24} color={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: theme.surface,
  },
  icon: {
    color: theme.textPrimary,
  }
});
