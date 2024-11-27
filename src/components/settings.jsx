import React from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export const SettingsBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <View>
        <MaterialIcons name="settings" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
}

