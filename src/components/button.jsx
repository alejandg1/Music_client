import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { Link } from "expo-router";
import { usePlaylist } from "../context/PlaylistContext";
import { play } from "react-native-track-player/lib/src/trackPlayer";


export const TogglePlayPauseBtn = ({ toggle, onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={toggle ? "pause-circle-sharp" : "play-circle-sharp"} size={60} color={style.secondaryText} />
    </Pressable>
  );
}

export const NextBtn = ({ onPress }) => {
  const { playlist } = usePlaylist();
  const { style } = useTheme();
  if (playlist.length != 0) {
    return (
      <Pressable >
        <Ionicons name="play-skip-forward-outline" size={40} color={style.border} />
      </Pressable>
    );
  }
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="play-skip-forward-outline" size={40} color={style.secondaryText} />
    </Pressable>
  );
}

export const PrevBtn = ({ onPress }) => {
  const { style } = useTheme();
  const { playlist, PrevSong, initSong } = usePlaylist();
  const color = playlist.length != 0 ? style.border : style.secondaryText;
  const func = playlist.length != 0 ? () => { initSong(playlist[0]) } : PrevSong;

  return (
    <Pressable onPress={func}>
      <Ionicons name="play-skip-back-outline" size={40} color={color} />
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

export const SubmitBtn = ({ onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable style={[styles.btn, { backgroundColor: style.btn }]} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={34} color={style.accent} />
    </Pressable>
  );
}

export const SettingsBtn = ({ onPress, text }) => {
  const { style } = useTheme();
  return (
    <Pressable style={[styles.btn, { backgroundColor: style.btn }]} onPress={onPress}>
      <Text style={[styles.text, { color: style.text }]}>{text}</Text>
    </Pressable>
  );
}

export const LinkBtn = ({ route, text }) => {
  const { style } = useTheme();
  return (
    <Link href={route} asChild>
      <Pressable style={[styles.btn, { backgroundColor: style.btn }]}>
        <Text style={[styles.text, { color: style.text }]}>{text}</Text>
      </Pressable>
    </Link>
  );
}

export const SearchBtn = ({ onPress }) => {
  const { style } = useTheme();
  return (
    <Pressable style={[styles.btn, { backgroundColor: style.btn }]} onPress={onPress}>
      <Ionicons name="search" size={30} color={style.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 20,
    fontFamily: "JetBrainsMono-Regular",
  },

});



