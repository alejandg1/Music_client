import { ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { RootContainer } from "./container";

export const Loading = () => {
  const { style } = useTheme();
  return (
    <RootContainer>
      <ActivityIndicator size="large" color={style.accent} />
    </RootContainer>
  );
}


