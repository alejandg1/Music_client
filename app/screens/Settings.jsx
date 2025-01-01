import React from "react";
import { View, StyleSheet } from "react-native";
import { removeCredentials } from "../../src/utils/subsonic/user";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import { SettingsBtn } from "../../src/components/button";
import { PrincipalText } from "../../src/components/text";

export default function Settings() {
  const { style } = useTheme();
  const handleRemoveCredentials = () => {
    removeCredentials().then((resp) => {
      resp ? router.replace("/Login") : Alert.alert("Error", "No se pudieron eliminar las credenciales.");
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: style.background, }]}>
      <PrincipalText>Configuración</PrincipalText>
      <View style={styles.optionContainer}>
        <SettingsBtn text="Log Out" onPress={() => {
          handleRemoveCredentials()
        }
        } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start"
  },
});

