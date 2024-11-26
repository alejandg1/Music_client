import React from "react";
import { Login } from "../subsonic/user";
import { View, TextInput, Text, StyleSheet } from "react-native";

const LoginView = () => {
  const [url, setUrl] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Set server credentials</Text>
      <TextInput
        placeholder="URL"
        value={url}
      />
      <TextInput
        placeholder="Username"
        value={username}
      />
      <TextInput
        placeholder="Password"
        value={password}
      />
      <Button title="Login" onPress={() => Login(url, username, password)} />
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

export default LoginView;
