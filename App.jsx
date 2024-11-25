import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Appearance, useColorScheme } from "react-native";
import { Player } from "./src/components/player";
import { Navbar } from "./src/components/navbar";
import { ThemeProvider } from "./src/components/themeProvider";
import { ThemeSwitcher } from "./src/components/themeSwitcher";
import { Themes } from "./src/styles/colorSchemes";

export default function App() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === "dark" ? Themes.dark : Themes.light;

  const styles = () => {
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: scheme.background,
      },
      content: { flex: 1, padding: 16 },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: scheme.surface
      },
    })
  }

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <View style={styles.container}>
            <ThemeSwitcher />
          </View>
          <Player />
          <Navbar />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  )
}

