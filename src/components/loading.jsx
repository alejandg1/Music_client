import { ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const Loading = () => {
  const { style } = useTheme();
  return (
    <ActivityIndicator size="large" color={style.accent} />
  );
}
