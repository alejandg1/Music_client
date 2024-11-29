import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const Settings = () => {
  const navigation = useNavigation();
  const handleClearCredentials = async () => {
    try {
      await AsyncStorage.multiRemove(["url", "username", "password"]);
      Alert.alert("Éxito", "Las credenciales han sido eliminadas.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al eliminar las credenciales:", error);
      Alert.alert("Error", "No se pudieron eliminar las credenciales.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.optionContainer}>
        <Button
          title="Eliminar credenciales guardadas"
          color="#d9534f"
          onPress={handleClearCredentials}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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

