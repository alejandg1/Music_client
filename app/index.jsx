import React, { useEffect, useState } from "react";
import { RootContainer } from "../src/components/container";
import { useFonts } from "expo-font";
import { Loading } from "../src/components/loading";
import { useRouter } from "expo-router";
import { checkCredentials } from "../src/utils/subsonic/user";

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <RootContainer>
      <Loading />
    </RootContainer>
  );
}
