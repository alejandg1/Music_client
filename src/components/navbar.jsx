import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <MaterialIcons name="home" size={24} color={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="public" size={24} color={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="library-music" size={24} color={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = () => StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#1f1f1f",
  },
  icon: {
    color: "white"
  }
});
