import React, { useEffect, useState } from "react";
import { View, Image, Pressable, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ListItem } from "../../../src/components/listItem";
import { getAlbum } from "../../../src/utils/subsonic/albums";
import { getCoverArt } from "../../../src/utils/subsonic/art";
import { useTheme } from "../../../src/context/ThemeContext";



export default function Albums() {
  const [coverArt, setCoverArt] = useState(null);
  const { style } = useTheme();
  const { Album } = useLocalSearchParams();
  const [songs, setSongs] = useState([])
  const [object, setObject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      let data = await getAlbum(Album)
      setObject(data);
      setLoading(false);
    };
    fetchSongs();
    setSongs(object.song)
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
          <View style={[styles.header]}>
            <Image style={styles.image} source={{ uri: coverArt }} />
            <View style={styles.textContainer}>
              <Text style={[styles.header,{color:style.text}]}>{object.name}</Text>
              <Text style={[styles.header,{color:style.secondaryText}]}>{object.artist}</Text>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 70,
    padding: 10,
    height: "100%",
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
    marginTop: 20,
    borderRadius: 10,
  },
});
