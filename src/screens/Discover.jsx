import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Card } from "../components/cards";
import { getPlaylists } from "../subsonic/playlists";
import { getNewestsAlbums } from "../subsonic/albums";

const Discover = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [loadingAl, setLoadingAl] = useState(true);

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data.playlist);
      setLoading(false);
    });
    getNewestsAlbums().then((data) => {
      setAlbums(data);
      setLoadingAl(false);
    });
  }, []);

  const renderPlaylists = () => {
    return playlists.map((playlist) => {
      return <Card id={playlist.id} src="" desc={playlist.name} />;
    });
  }
  const renderALbums = () => {
    return albums.map((album) => {
      return (
          <Card id={album.id} src="" desc={album.name} />
      );
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>PlayLists</Text>
      <View style={{ flexDirection: "row" }}>
        {loading ? <Text>Loading...</Text> : renderPlaylists()}
      </View>
      <Text style={styles.text}>Recently Added</Text>
      <View style={{ flexDirection: "row" }}>
        {loadingAl ? <Text>Loading...</Text> : renderALbums()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default Discover;
