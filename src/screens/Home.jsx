import React from "react";
import { ScrollView, Text } from "react-native";

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Recently played</Text>

      <Text style={styles.sectionTitle}>Local playlists</Text>

      <Text style={styles.sectionTitle}>Albums</Text>
    </ScrollView>
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
