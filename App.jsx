import React, { useEffect, useState } from "react";
import { Settings } from "./src/screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "./src/screens/Login";
import { Navbar } from "./src/components/navbar";
import { getConfig } from "./src/local/config";

const Stack = createNativeStackNavigator();

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkCredentials = async () => {
      const url = await getConfig("url");
      const username = await getConfig("username");
      const password = await getConfig("password");
      if (url && username && password) {
        setIsLoggedIn(true);
      }
    };
    checkCredentials();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={Navbar} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Login" component={LoginView} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginView} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
