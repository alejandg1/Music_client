import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { usePlaylist } from "../context/PlaylistContext"
import { TogglePlayPauseBtn, NextBtn } from "./button";
import { GetSong } from "../utils/subsonic/songs";
import { getCoverArt } from "../utils/subsonic/art";
import { SecondaryText } from "./text";
import { useRouter } from "expo-router";

export const Player = () => {
  const { style } = useTheme();
  const [song, setSong] = useState(null);
  const [cover, setCover] = useState(null);
  const { currentSong, playlist, isPlaying, TogglePlayPause } = usePlaylist();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `/screens/song/${song.id}`,
      params: { cover: cover },
    });
  }

  useEffect(() => {
    const fetchSong = async () => {
      const songDetails = await GetSong(currentSong);
      const coverUri = await getCoverArt(songDetails.coverArt);
      if (songDetails) {
        setSong(songDetails);
      }
      setCover(coverUri);
    };
    fetchSong();
  }, [currentSong]);
  if (playlist.length == 0 || !song || !cover) {
    return null;
  }

  return (
    <Pressable style={[styles.player, { backgroundColor: style.card }]} onPress={handlePress}>
      <View style={styles.info}>
        <Image source={{ uri: cover }} style={styles.albumArt} />
        <View style={styles.text}>
          <Text numberOfLines={1} style={[styles.title, { color: style.text }]}>{song.title}</Text>
          <Text numberOfLines={1} style={[styles.artist, { color: style.secondaryText }]}>{song.artist}</Text>
        </View>
      </View>
      <View style={styles.controls}>
        <TogglePlayPauseBtn size={45} toggle={isPlaying} onPress={TogglePlayPause} />
        <NextBtn size={35} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  player: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "10%",
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "JetBrainsMono-Bold",
    maxWidth: "90%",
    overflow: "hidden",
  },
  artist: {
    maxWidth: "90%",
    overflow: "hidden",
    fontSize: 14,
    fontFamily: "JetBrainsMono-Regular",
  },
  text: {
    display: "flex",
    flexDirection: "column",
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

});
