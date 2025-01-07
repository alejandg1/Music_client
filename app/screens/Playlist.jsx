import React from "react";
import { Text } from "react-native";
import { usePlaylist } from "../../src/context/PlaylistContext";
import { GetSong } from "../../src/utils/subsonic/songs";
import { FlatList } from "react-native-gesture-handler";
import { RootContainer } from "../../src/components/container";

export default function Playlist() {
  const { playlist } = usePlaylist();

  useEffect(() => {
    let songs = []
    array.forEach(song => {
      let data = GetSong(song)
      songs.push(data)
    });
  }, [playlist]);

  return (
    <RootContainer>
      <FlatList data={songs} renderItem={({ item }) => <Text>{item.title}</Text>} />
    </RootContainer>
  );
};
