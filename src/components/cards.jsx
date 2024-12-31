import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Animated, Pressable, Text, Image } from "react-native";
import { getCoverArt } from "../utils/subsonic/art"
import { Link } from "expo-router";
import { useTheme } from "../context/ThemeContext"

export const Card = ({ src, id, desc, type }) => {
  const [cover, setCover] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const { style } = useTheme();

  useEffect(() => {
    const fetchCover = async () => {
      let data = await getCoverArt(src);
      setCover(data);
    };
    fetchCover();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <Link href={type == "Playlist" ? `/screens/list/${id}` : `/screens/album/${id}`} asChild>
        <Pressable style={styles.card}>
          <Image style={styles.image} source={{ uri: cover }} />
          <Text style={[styles.description, { color: style.secondaryText }]}>{desc}</Text>
        </Pressable>
      </Link>

    </Animated.View >
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "JetBrainsMono-Bold",
  },
});
