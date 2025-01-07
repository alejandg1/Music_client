import React, { useState, useEffect } from "react";
import { useTheme } from "../../src/context/ThemeContext";
import { PrincipalText, SecondaryText } from "../../src/components/text";
import { ScrollView, View, StyleSheet, FlatList, ActivityIndicator, Alert, Pressable } from "react-native";
import { Card } from "../../src/components/cards";
import { getPlaylists } from "../../src/utils/subsonic/playlists";
import { getNewestsAlbums } from "../../src/utils/subsonic/albums";
import { LinkBtn } from "../../src/components/button";
import { SearchBar } from "../../src/components/searchBar";
import { ping } from "../../src/utils/subsonic/Index";
import { RootContainer } from "../../src/components/container";
import { Player } from "../../src/components/player";

const checkConection = async () => {
  let connected = await ping();
  return connected;
}

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
  const { style } = useTheme();
  const [playlists, setPlaylists] = useState([]);
  const [connected, setConnected] = useState(false);
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
    checkConection().then((data) => {
      if (!data) {
        Alert.alert("Error", "No se pudo conectar al servidor.");
      }
      setConnected(data);
    }
    );
  }, [connected]);

  if (!connected) {
    return (
      <View style={[styles.container, { backgroundColor: style.background }]}>
        <PrincipalText text="No se pudo conectar al servidor." />
        <Pressable onPress={() => checkConection()}><SecondaryText text="Reintentar" /></Pressable>
      </View>
    );
  }

  return (
    <RootContainer>
      <View style={styles.header}>
        <SearchBar />
      </View>
      <ScrollView>
        <Pressable onPress={() => checkConection()}><SecondaryText text="Reintentar" /></Pressable>
        <PrincipalText text="Playlists" />
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

        <PrincipalText text="Recently added" />
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
        <LinkBtn text="Artistas" route="/screens/Artists" />
      </ScrollView>
      <Player />
    </RootContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  carousel: {
    marginBottom: 20,
    paddingLeft: 10,
  },
});
