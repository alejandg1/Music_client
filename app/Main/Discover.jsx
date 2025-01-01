import React, { useState, useEffect } from "react";
import { useTheme } from "../../src/context/ThemeContext";
import { PrincipalText } from "../../src/components/text";
import { ScrollView, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Card } from "../../src/components/cards";
import { getPlaylists } from "../../src/utils/subsonic/playlists";
import { getNewestsAlbums } from "../../src/utils/subsonic/albums";
import { LinkBtn, SearchBtn } from "../../src/components/button";

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
    <View style={[styles.container,{backgroundColor:style.background}]}>
      <View style={styles.header}>
        <SearchBtn />
      </View>
      <ScrollView>
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
    </View>
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
