import { useState } from "react";
import { Alert } from "react-native";
import { Login } from "../subsonic/user";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const LoginView = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (url === "" || username === "" || password === "") {
      Alert.alert("Error", "Faltan datos.");
    }
    else {
      let logged = await Login(url, username, password);
      if (logged) {
        navigation.navigate("Main");
      }
      else {
        Alert.alert("Error", "Error al iniciar sesión.");
      }

    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Server Credentials</Text>
      <TextInput
        style={styles.input}
        placeholder="URL"
        placeholderTextColor="#888"
        value={url}
        inputMode="url"
        textContentType="URL"
        autoCapitalize="none"
        keyboardType="url"
        autoComplete="url"
        onChangeText={setUrl}
      />
      <TextInput
        style={styles.input}
        autoComplete="username"
        keyboardType="default"
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin()
        }
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "white",
    marginBottom: 15,
    backgroundColor: "#1E1E1E",
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
