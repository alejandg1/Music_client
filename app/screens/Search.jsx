import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SettingsBtn } from "../../src/components/settings";

export default function Search() {
  return (
    <View style={styles.container}>
      <SettingsBtn />
      <Text style={styles.text}>search Screen</Text>
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
