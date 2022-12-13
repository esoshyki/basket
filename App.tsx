import { StatusBar, StyleSheet, View } from 'react-native';
import Game from './components/Game';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

export default function App() {

  const lockScreen = async () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
  }

  useEffect(() => {
    lockScreen()
  }, [lockScreen])

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
