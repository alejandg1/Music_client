import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { usePlaylist } from "../context/PlaylistContext"
import { TogglePlayPauseBtn, NextBtn } from "./button";
import { GetSong } from "../utils/subsonic/songs";
import { getCover } from "../utils/subsonic/art";

export const Player = () => {
  const [song, setSong] = useState(null);
  const [cover, setCover] = useState(null);
  const { sound, currentSong, playlist, isPlaying, TogglePlayPause } = usePlaylist();

  useEffect(() => {
    console.log(currentSong)
    const fetchSong = async () => {
      const songDetails = await GetSong(currentSong);
      if (songDetails) {
        setSong(songDetails);
      }
    };
    fetchSong();
    const fetchCover = async () => {
      let data = await getCover(song.coverArt);
      setCover(data);
    }
    fetchCover();
  }, [sound]);

  if (playlist.length == 0) {
    return null;
  }

  return (
    <View style={styles.player}>
      <Image source={{ uri: cover }} style={styles.albumArt} />
      <View style={styles.info}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.artistName}>{song.artist}</Text>
      </View>
      <TogglePlayPauseBtn toggle={isPlaying} onPress={TogglePlayPause} />
      <NextBtn />
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  player: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: theme.surface,
    borderRadius: 8,
    margin: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  songTitle: {
    color: theme.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  artistName: {
    color: theme.textPrimary,
    fontSize: 14,
    marginTop: 4,
  },
  playButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: theme.surface,
    borderRadius: 5,
  },
  playButtonText: {
    color: theme.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
