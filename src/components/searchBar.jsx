import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SearchBar = ({ onSearchChange }) => {
  const { style } = useTheme(); 
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const animationValue = useState(new Animated.Value(50))[0];

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);

    Animated.timing(animationValue, {
      toValue: isExpanded ? 50 : 250,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleTextChange = (text) => {
    setSearchText(text);
    onSearchChange(text);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchBar, { width: animationValue, backgroundColor: style.text }]}>
        {isExpanded && (
          <TextInput
            style={styles.input}
            placeholder="Buscar..."
            placeholderTextColor={style.placeholder}
            value={searchText}
            onChangeText={handleTextChange} // Manejar el cambio de texto
            autoFocus={true}
          />
        )}
        <TouchableOpacity onPress={toggleSearchBar} style={styles.icon}>
          <Ionicons name={isExpanded ? "close" : "search"} size={24} color={style.accent} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 5,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

