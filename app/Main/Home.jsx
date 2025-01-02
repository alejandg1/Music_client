import React from "react";
import { View, StyleSheet } from "react-native";
import { SettingsBtn } from "../../src/components/settings";
import { PrincipalText } from "../../src/components/text";
import { SearchBtn } from "../../src/components/button";
import { RootContainer } from "../../src/components/container";
import { Player } from "../../src/components/player";

export default function Home() {
  return (
    <RootContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBtn />
          <SettingsBtn />
        </View>
        <View style={styles.content}>
          <PrincipalText text="Bienvenido a MusiCli" />
          <Player />
        </View>
      </View>
    </RootContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
});
