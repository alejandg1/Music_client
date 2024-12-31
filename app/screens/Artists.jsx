import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../../src/components/listItem";
import { getArtists } from "../../src/utils/subsonic/artists";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      let data = await getArtists();
      setArtists(data);
      setLoading(false);
    }
    fetchArtists();

  }, []);
  const renderList = ({ item }) => {
    return (
      <ListItem key={item.id} item={item} />
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Artists</Text>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderList}
        style={styles.carousel} >
      </FlatList>

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
