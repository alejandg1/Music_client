import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Home from "../../app/screens/Home";
import Discover from "../../app/screens/Discover";
import Downloads from "../../app/screens/Downloads";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export const Navbar = () => {
  const { style } = useTheme();
  return (
    <>
      <StatusBar style="auto" />
      <Tab.Navigator
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
            backgroundColor: style.background,
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 5,
            height: 60,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          animation: "fade",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="Downloads" component={Downloads} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "#f0f0f0",
    marginLeft: 1,
  },
  cont: {
    borderRadius: 15,
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
