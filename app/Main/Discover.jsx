import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../../src/components/cards";
import { getPlaylists } from "../../src/utils/subsonic/playlists";
import { getNewestsAlbums } from "../../src/utils/subsonic/albums";
import { Link } from "expo-router";

const renderAlbum = ({ item }) => {
  return (
    <Card type="Album" key={item.id} src={item.coverArt} id={item.id} desc={item.name} />
  )
}

const renderList = ({ item }) => {
  return (
    <Card type="Playlist" key={item.id} src={item.coverArt} id={item.id} desc={item.name} />
  )
}


export default function Discover() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [loadingAl, setLoadingAl] = useState(true);

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data.playlist || []);
      setLoading(false);
    });
    getNewestsAlbums().then((data) => {
      setAlbums(data || []);
      setLoadingAl(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Playlists</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <FlatList
            data={playlists}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderList}
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          />
        )}

        <Text style={styles.text}>Recently Added</Text>
        {loadingAl ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <FlatList
            data={albums}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAlbum}
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          />
        )}

        <Link href="/screens/Artists" asChild>
          <Pressable style={styles.button} >
            <Text style={styles.text}>Artistas</Text>
            <MaterialIcons name="music-note" size={30} color="#ffffff" />
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  button: {
    backgroundColor: "#5752D7",
    display: "flex",
    flexDirection: "row",
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 10,
  },
  carousel: {
    marginBottom: 20,
    paddingLeft: 10,
  },
});
