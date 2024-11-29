import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { GetPlayingSong } from "../subsonic/songs"

export const Player = () => {
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    GetPlayingSong().then((song) => {
      setSong(song);
    })
  }, []);

  const handlePlayPlause = () => {
    setIsPlaying(!isPlaying);
  }
  const handleNext = () => {
    console.log("Next");
  }


  if (!song) {
    return null;
  }

  return (
    <View style={styles.player}>
      <Image source={{ uri: song.cover }} style={styles.albumArt} />
      <View>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.artistName}>{song.artist}</Text>
      </View>
      <TouchableOpacity onPress={handlePlayPlause} style={styles.playButton}>
        <MaterialIcons name={isPlaying ? "play-circle-filled" : "pause-circle-filled"} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext} style={styles.playButton}>
        <MaterialIcons name="skip-next" size={32} color="white" />
      </TouchableOpacity>
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
