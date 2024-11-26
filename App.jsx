import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Navbar } from './src/components/navbar'
import { Player } from './src/components/player'
import { Card } from './src/components/cards'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row' }}>
        <Card type="red" />
        <Card type="green" />
        <Card type="blue" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Player />
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
