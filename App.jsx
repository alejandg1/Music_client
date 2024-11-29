import React, { useEffect, useState } from "react";
import { Settings } from "./src/screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "./src/screens/Login";
import { Navbar } from "./src/components/navbar";
import { checkCredentials } from "./src/subsonic/user";

const Stack = createNativeStackNavigator();

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let loged = checkCredentials();
    loged.then((res) => {
      setIsLoggedIn(res);
    });
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
          <>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Main" component={Navbar} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
