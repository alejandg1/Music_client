import React from "react";
import { StyleSheet, View,Text } from "react-native";

export const Card = (type) => {
  return (
    <View type={type} style={styles.card}>
      <Text>Card</Text>
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
});
