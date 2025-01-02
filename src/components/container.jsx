import { View, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const RootContainer = ({ children }) => {
  const { style } = useTheme();
  return <View style={[styles.container,{backgroundColor:style.background}]}>{children}</View>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

