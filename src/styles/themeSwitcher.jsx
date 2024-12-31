import React from 'react';
import { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from './themeProvider';

export const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <MaterialIcons
        name={mode === 'dark' ? 'light-mode' : 'dark-mode'}
        size={24}
        color={mode === 'dark' ? '#000000' : '#ffffff'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
});
