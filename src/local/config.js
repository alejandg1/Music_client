import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js"

export const setConfig = async (key, value) => {
  try {
    await AsyncStorage.setItem
      (key, value);
  }
  catch (error) {
    console.log(error);
  }
}

export const getConfig = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  }
  catch (error) {
    console.log(error);
  }
}

export const genSalt = (bytes) => {
  return CryptoJS.lib.WordArray.random(bytes).toString(CryptoJS.enc.Hex);
}

