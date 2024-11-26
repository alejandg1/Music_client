import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export const Card = (src, desc) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={src} />
      <Text>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "#888888",
  },
});
