import { StatusBar, StyleSheet, View } from 'react-native';
import Game from './components/Game';

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
