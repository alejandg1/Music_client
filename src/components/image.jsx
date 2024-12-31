import { Image } from "react-native";
import { StyleSheet } from "react-native";


export const ListImage = ({ source }) => {
  return <Image source={{ uri: source }} style={{ width: 50, height: 50 }} />;
}

export const CardImage = ({ source }) => {
  return <Image source={{ uri: source }} style={{ width: 60, height: 60, borderRadius: 8 }} />;
}

export const CoverImage = ({ source }) => {
  return <Image source={{ uri: source }} style={styles.cover} />;
}


const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  card: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});


