import React from "react";
import { ThemeProvider } from "./src/components/themeProvider";
import { HomeScreen } from "./src/screens/Home";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
