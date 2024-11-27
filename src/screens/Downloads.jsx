import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Downloads = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Downloads Screen</Text>
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
