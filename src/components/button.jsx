import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { Link, router } from "expo-router";
import { usePlaylist } from "../context/PlaylistContext";

export const ListPlayBtn = ({ songs }) => {
  const { addToPlaylist, initSong, playlist, dropPlaylist } = usePlaylist();
  const { style } = useTheme();
  const onPress = async () => {
    dropPlaylist();
    songs.forEach((song) => {
      addToPlaylist(song.id);
    });
    await initSong(playlist[0]);
  }

  return (
    <Pressable onPress={onPress}>
      <Ionicons name="play-outline" size={40} color={style.accent} />
    </Pressable>
  );
}



export const TogglePlayPauseBtn = ({ toggle, onPress, size }) => {
  const { style } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={toggle ? "pause-circle-sharp" : "play-circle-sharp"} size={size ? size : 60} color={style.icon} />
    </Pressable>
  );
}

export const NextBtn = ({ onPress, size }) => {
  const { playlist } = usePlaylist();
  const { style } = useTheme();
  if (playlist.length == 0) {
    return (
      <Pressable >
        <Ionicons name="play-skip-forward-outline" size={size ? size : 40} color={style.border} />
      </Pressable>
    );
  }
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="play-skip-forward-outline" size={40} color={style.icon} />
    </Pressable>
  );
}

export const PrevBtn = ({ onPress }) => {
  const { style } = useTheme();
  const { playlist, PrevSong, initSong } = usePlaylist();
  const color = playlist.length == 0 ? style.border : style.icon;
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

export const PlaylstBtn = () => {
  const { style } = useTheme();
  const redirect = () => {
    router.push("/screens/Playlist");
  }
  return (
    <Pressable style={[styles.btn, { backgroundColor: style.btn }]} onPress={redirect}>
      <Ionicons name="musical-notes" size={30} color={style.accent} />
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



