import { useState } from "react";
import { SingIn } from "../src/utils/subsonic/user";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SubmitBtn } from "../src/components/button";
import { PrincipalInput } from "../src/components/imput";
import { router } from "expo-router";

export default function Login() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (url === "" || username === "" || password === "") {
      Alert.alert("Error", "Faltan datos.");
    }
    else {
      let logged = await SingIn(url, username, password);
      if (logged) {
        router.replace("/Main/Home");
      }
      else {
        Alert.alert("Error", "Error al iniciar sesión.");
      }

    }

  }

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Set Server Credentials</Text>

      <PrincipalInput value={url} onChangeText={setUrl} placeholder="URL" />
      <PrincipalInput value={username} onChangeText={setUsername} placeholder="Username" />
      <PrincipalInput value={password} onChangeText={setPassword} placeholder="Password" />
      <SubmitBtn onPress={() => handleLogin()} />
    </View >
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
});
