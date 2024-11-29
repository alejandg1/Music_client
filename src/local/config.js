import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRandomBytesAsync } from "expo-crypto"

export const setConfig = async (key, value) => {
  try {
    await AsyncStorage.setItem
      (key, value);
  }
  catch (error) {
    return false;
  }
}

export const getConfig = async (key) => {
  try {
    let item = (await AsyncStorage.getItem(key));
    return item;
  }
  catch (error) {
    return false;
  }
}

export const genSalt = (bytes) => {
  try {
    let salt = getRandomBytesAsync(bytes);
    return salt;
  }
  catch (error) {
    return false;
  }
}

