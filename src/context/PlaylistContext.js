import React, { createContext, useState, useContext } from "react";
import { streamSong } from "../utils/subsonic/songs";
import { Audio } from "expo-av";

const PlayListContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLocal, setIsLocal] = useState(true);
  const addToPlaylist = (song) => {
    setPlaylist((prev) => [...prev, song]);
  }
  const removeFromPlaylist = (song) => {
    setPlaylist((prev) => prev.filter((s) => s !== song));
  }
  const toggleIsLocal = () => {
    setIsLocal((prev) => !prev);
  }
  const dropPlaylist = () => {
    setPlaylist([]);
  }
  const initSong = async (id, local) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const uri = local ? await streamSong(id) : await streamSong(id);
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: true, staysActiveInBackground: true }
      );
      setSound(playbackObject);
      setIsPlaying(true);
      setCurrentSong(id);
      await playbackObject.playAsync();
    }
    catch (error) {
      console.log(error);
    }
  }
  const TogglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
    else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  const NextSong = (song) => {
  }
  const PrevSong = (song) => {
  }

  return (
    <PlayListContext.Provider
      value={{
        dropPlaylist,
        playlist,
        isPlaying,
        addToPlaylist,
        removeFromPlaylist,
        currentSong,
        isLocal,
        toggleIsLocal,
        initSong,
        TogglePlayPause,
        NextSong,
        PrevSong,
      }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);
