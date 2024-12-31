import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../src/context/ThemeContext";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { checkCredentials } from "../src/utils/subsonic/user";

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { style } = useTheme();
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Bold": require("../src/assets/fonts/JetBrainsMono-Bold.ttf"),
    "JetBrainsMono-Regular": require("../src/assets/fonts/JetBrainsMono-Regular.ttf")
  });

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await checkCredentials();
        setIsLoggedIn(res);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  useEffect(() => {
    if (!isLoading && fontsLoaded) {
      if (isLoggedIn) {
        router.replace("/Main/Home");
      } else {
        router.replace("/Login");
      }
    }
  }, [isLoading, isLoggedIn, fontsLoaded]);

  return (
    <View style={[styles.container,{backgroundColor:style.background}]}>
      <ActivityIndicator size="large" color={style.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

