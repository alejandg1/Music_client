import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Player } from "../components/player";
import { Navbar } from "../components/navbar";
import { useTheme } from "../components/themeProvider";

export const HomeScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="sunny" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Recently played</Text>

        <Text style={styles.sectionTitle}>Local playlists</Text>

        <Text style={styles.sectionTitle}>Albums</Text>
      </ScrollView>

      <Player
      />


      <Player />
      <Navbar />
    </View>
  );
};
export default HomeScreen;


const styles = (theme) => {
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    content: { padding: 16 },
    sectionTitle: {
      color: theme.textPrimary,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: theme.surface,
    },
  })
}
