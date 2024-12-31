import React, { createContext, useState, useContext } from "react";

const PlayListContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLocal, setIsLocal] = useState(true);
  const addToPlaylist = (song) => {
    setPlaylist((prev) => [...prev, song]);
  }
  const removeFromPlaylist = (song) => {
    setPlaylist((prev) => prev.filter((s) => s !== song));
  }
  const selectSong = (id) => {
    const song = playlist.find((s) => s === id);
    setCurrentSong(song);
  }
  const toggleIsLocal = () => {
    setIsLocal((prev) => !prev);
  }

  return (
    <PlayListContext.Provider 
      value={{
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        currentSong,
        selectSong,
        isLocal,
        toggleIsLocal,
      }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);
