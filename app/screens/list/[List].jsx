import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPlaylist } from "../../../src/utils/subsonic/playlists";
import { ListItem } from "../../../src/components/listItem";
import { getCoverArt } from "../../../src/utils/subsonic/art";
import { useTheme } from "../../../src/context/ThemeContext";

export default function Lists() {
  const { List } = useLocalSearchParams();
  const [songs, setSongs] = useState([])
  const [object, setObject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coverArt, setCoverArt] = useState(null);
  const { style } = useTheme();

  useEffect(() => {
    const fetchSongs = async () => {
      let data = await getPlaylist(List)
      setObject(data);
      setLoading(false);
    };
    fetchSongs();
    setSongs(object.entry)

    let cover = async () => {
      let data = await getCoverArt(object.coverArt)
      setCoverArt(data);
    }
    cover();


  }, [loading]);
  const renderList = ({ item }) => {
    return (
      <ListItem key={item.id} item={item} />
    )

  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={style.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: style.background }]}>
      {loading ? (
        <ActivityIndicator size="large" color={style.accent} />
      ) : (
        <>
          <View style={[styles.header, { color: style.text }]}>
            <Image style={styles.image} source={{ uri: coverArt }} />
            <View style={styles.textContainer}>
              <Text style={[styles.text,{color:style.text}]}>{object.name}</Text>
              <View style={styles.buttons}>
                <Pressable onPress={() => console.log('pressed')}>
                  <MaterialIcons name="play-arrow" size={30} color={style.accent} />
                </Pressable>
                <Pressable onPress={() => console.log('pressed')}>
                  <MaterialIcons name="shuffle" size={30} color={style.accent} />
                </Pressable>
                <Pressable onPress={() => console.log('pressed')}>
                  <MaterialIcons name="download" size={30} color={style.accent} />
                </Pressable>
              </View>
            </View>
          </View>
          <FlatList
            data={songs}
            horizontal={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderList}
            style={styles.carousel}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 60,

  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 24,
    height: "25%",
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    width: '50%',
    alignItems: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 19,
    fontFamily: "Jetbrains-bold",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  carousel: {
    borderRadius: 10,
  },
});
