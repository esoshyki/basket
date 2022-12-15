import { SafeAreaView, StatusBar, View } from 'react-native'
import Game from './components/Game'
import * as SplashScreen from 'expo-splash-screen'
import { Fragment, memo, useState } from 'react'
import ScreenContextWrapper, { useScreen } from './contexts/screenContext'
import GameContextWrapper, { useGame } from './contexts/gameContext'
import Menu from './components/Menu'
import { getScreenSize } from './helpers/getScreenSize'

const Content = memo(() => {
  const { showMenu } = useGame()

  const { width, height } = getScreenSize()


  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        top: 0,
        left: 0,
        width,
        height,
      }}
    >
      {showMenu ? <Menu /> : <Game />}
      <StatusBar hidden />
    </View>
  )
})

export default function App() {
  SplashScreen.preventAutoHideAsync()
  setTimeout(SplashScreen.hideAsync, 2000)
  return (
    <ScreenContextWrapper>
      <GameContextWrapper>
        <Content />
      </GameContextWrapper>
    </ScreenContextWrapper>
  )
}
