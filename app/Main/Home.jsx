import React from "react";
import { View, StyleSheet } from "react-native";
import { SettingsBtn } from "../../src/components/settings";
import { SecondaryText, PrincipalText } from "../../src/components/text";
import { useTheme } from "../../src/context/ThemeContext";
import { SearchBtn } from "../../src/components/button";

export default function Home() {
  const { style } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: style.background }]}>
      <View style={styles.header}>
        <SearchBtn />
        <SettingsBtn />
      </View>
      <View style={styles.content}>
        <PrincipalText text="Bienvenido a MusiCli" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
});
