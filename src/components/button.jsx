import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";


export const TogglePlayPauseBtn = ({ toggle, onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={toggle ? "pause-circle-sharp" : "play-circle-sharp"} size={60} color={style.secondaryText} />
    </Pressable>
  );
}

export const NextBtn = ({ onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="play-skip-forward-outline" size={40} color={style.secondaryText} />
    </Pressable>
  );
}

export const PrevBtn = ({ onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="play-skip-back-outline" size={40} color={style.secondaryText} />
    </Pressable>
  );
}

export const ShuffleBtn = ({ onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="shuffle" size={34} color={style.accent} />
    </Pressable>
  );
}

export const RepeatBtn = ({ state, onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="repeat" size={34} color={style.accent} />
    </Pressable>
  );
}
