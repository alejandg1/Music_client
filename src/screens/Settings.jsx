import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeCredentials } from "../subsonic/user";
import { Alert } from "react-native";

export const Settings = () => {
  const navigation = useNavigation();
  const handleRemoveCredentials = () => {
    removeCredentials().then((resp) => {
      resp ? navigation.navigate("Login") : Alert.alert("Error", "No se pudieron eliminar las credenciales.");
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.optionContainer}>
        <Button
          title="Eliminar credenciales guardadas"
          color="#d9534f"
          onPress={handleRemoveCredentials}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionContainer: {
    marginVertical: 10,
  },
});

