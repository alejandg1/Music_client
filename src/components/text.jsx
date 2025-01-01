import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Text } from "react-native";

export const PrincipalText = ({ text }) => {
  const { style } = useTheme();
  return <Text style={[styles.principal, { color: style.text }]}>{text}</Text>;
}
export const SecondaryText = ({ text }) => {
  const { style } = useTheme();
  return <Text style={[styles.secondary, { color: style.secondaryText }]}>{text}</Text>;
}

const styles = StyleSheet.create({
  principal: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Bold",
  },
  secondary: {
    fontSize: 16,
    fontFamily: "JetBrainsMono-Regular"
  },
});

