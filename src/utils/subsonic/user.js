import { ping } from "./Index";
import { Alert } from "react-native";
import { setConfig, getConfig } from "../local/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SingIn = async (url, username, passw, version = "1.16.1", client = "Music_Client", coverSize = "720") => {
  setConfig("url", url);
  setConfig("username", username);
  setConfig("password", passw);
  setConfig("version", version);
  setConfig("client", client); setConfig("sizeCover", coverSize);
  let valid = await ping();
  if (valid) {
    return true;
  }
  else {
    return false;
  }
}

export const checkCredentials = async () => {
  const url = await getConfig("url");
  const username = await getConfig("username");
  const password = await getConfig("password");
  if (url && username && password) {
    return true
  }
  return false;
}



export const removeCredentials = async () => {
  try {
    await AsyncStorage.multiRemove(["url", "username", "password"]);
    Alert.alert("Éxito", "Las credenciales han sido eliminadas.");
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    return true
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "No se pudieron eliminar las credenciales.");
    return false
  }
};
