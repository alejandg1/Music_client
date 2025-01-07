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
  const nextSong = async () => {
    try {
      const currentIndex = playlist.indexOf(currentSong);
      console.log(currentIndex)
      if (currentIndex === -1 || currentIndex + 1 >= playlist.length) {
        console.log("No more songs in the playlist");
        return;
      }
      const nextSong = playlist[currentIndex + 1];
      setCurrentSong(nextSong);
      await initSong(nextSong, isLocal);
    } catch (error) {
      console.error("Error moving to the next song:", error);
    }

  }

  const initSong = async (id, local) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      console.log(id)
      const uri = local ? await streamSong(id) : await streamSong(id);
      setCurrentSong(id);
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: true, staysActiveInBackground: true }
      );
      setSound(playbackObject);
      setIsPlaying(true);
      playbackObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          console.log("Song Finished");
          nextSong();
        }
      }
      );
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
  return (
    <PlayListContext.Provider
      value={{
        sound,
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
        nextSong,
      }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);
