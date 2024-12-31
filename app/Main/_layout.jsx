import { Tabs } from "expo-router"
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "./Home";
import { View } from "react-native";
import Discover from "./Discover";
import Downloads from "./Downloads";

export default function MainLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = "home";
            }
            else if (route.name === 'Discover') {
              iconName = "public";
            }
            else if (route.name === 'Downloads') {
              iconName = "library-music";
            }

            return (
              <View style={[styles.cont, focused && styles.focused]}>
                <MaterialIcons
                  name={iconName}
                  size={28}
                  style={[styles.icon, focused && styles.iconFocused]}
                />
              </View>
            );
          },
          tabBarStyle: {
            backgroundColor: "#121212",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 5,
            height: 50,
            borderTopWidth: 0,
          },
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          animation: "fade",
        })}
      />
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Discover" component={Discover} />
      <Tabs.Screen name="Downloads" component={Downloads} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  icon: {
    color: "#f0f0f0",
    marginLeft: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  cont: {
    borderRadius: 20,
    padding: 10,
    height: 50,
    alignItems: "center",
    width: 50,
    backgroundColor: "#121212",
  },
  focused: {
    backgroundColor: "#5752D7",
  },
  iconFocused: {
    color: "#000000",
  },
});
