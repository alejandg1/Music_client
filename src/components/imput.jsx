import { TextInput } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { StyleSheet } from "react-native";

export const PrincipalInput = ({ value, onChangeText, placeholder }) => {
  const { style } = useTheme();
  return (
    <TextInput
      style={[styles.input]}
      placeholder={placeholder}
      placeholderTextColor={style.secondaryText}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
 export const SearchInput = ({ value, onChangeText, placeholder }) => {
  const { style } = useTheme();
  return (
    <TextInput
      style={[styles.input]}
      placeholder={placeholder}
      placeholderTextColor={style.secondaryText}
      value={value}
      onChangeText={onChangeText}
    />
  );

const styles = StyleSheet.create({
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
});
