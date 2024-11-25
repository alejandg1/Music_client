import { StyleSheet } from "react-native"

export const globalStyles = (theme) => {
  StyleSheet.create({
    button: {
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      backgroundColor: "transparent",
    },
    navbar: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 16,
      backgroundColor: "#1f1f1f",
    },

    navbar: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 16,
      backgroundColor: theme.surface,
    },
  })
}

