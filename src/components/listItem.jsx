import React, { useRef, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Animated, Pressable, Text, Image, View } from "react-native";
import { getCoverArt } from "../../src/utils/subsonic/art";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { usePlaylist } from "../context/PlaylistsContext";

export const ListItem = ({ item }) => {
  const [cover, setCover] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const router = useRouter()
  const { style } = useTheme();
  const { addToPlaylist, selectSong } = usePlaylist();
  const handlePress = () => {
    addToPlaylist(item.id);
    selectSong(item.id);
    router.push({
      pathname: `/screens/song/${item.id}`,
      params: { cover: cover },
    });
  }

  useEffect(() => {
    const fetchCover = async () => {
      let data = await getCoverArt(item.coverArt);
      setCover(data);
    };
    fetchCover();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Pressable onPress={() => handlePress()} style={[styles.card, { backgroundColor: style.card }]}>
        <Image style={styles.image} source={{ uri: cover }} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: style.text }]}>{item.title}</Text>
          <Text style={[styles.artist, { color: style.secondaryText }]}>{item.artist}</Text>
        </View>
        <View style={styles.icons} >
          <Pressable>
            <MaterialIcons name="download-done" size={24} color={style.accent} />
          </Pressable>
          <Pressable>
            <MaterialIcons name="more-horiz" size={24} color={style.accent} />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View >
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '20%',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "JetBrainsMono-Bold",
  },
  artist: {
    fontSize: 14,
    fontFamily: "JetBrainsMono-Regular",
    marginTop: 5,
  },
});
