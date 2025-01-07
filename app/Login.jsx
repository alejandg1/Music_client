import { useState } from "react";
import { SecondaryText } from "../src/components/text";
import { RootContainer } from "../src/components/container";
import { SingIn } from "../src/utils/subsonic/user";
import { Alert } from "react-native";
import { SubmitBtn } from "../src/components/button";
import { PasswordInput, PrincipalInput } from "../src/components/imput";
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
    <RootContainer>
      <SecondaryText text="Please enter your server credentials" />
      <PrincipalInput value={url} onChangeText={setUrl} placeholder="URL" />
      <PrincipalInput value={username} onChangeText={setUsername} placeholder="Username" />
      <PasswordInput value={password} onChangeText={setPassword} placeholder="Password" />
      <SubmitBtn onPress={() => handleLogin()} />
    </RootContainer>
  );
};
