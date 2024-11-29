import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Home } from "../screens/Home";
import { Discover } from "../screens/Discover"
import { Downloads } from "../screens/Downloads";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const Navbar = () => {
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
            backgroundColor: "#121212",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 5,
            height: 60,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          animation: "none",
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
