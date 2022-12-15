import { SafeAreaView, StatusBar, View } from 'react-native'
import Game from './components/Game'
import * as SplashScreen from 'expo-splash-screen'
import { Fragment, memo, useEffect, useState } from 'react'
import ScreenContextWrapper, { useScreen } from './contexts/screenContext'
import GameContextWrapper, { useGame } from './contexts/gameContext'
import Menu from './components/Menu'
import { getScreenSize } from './helpers/getScreenSize'
import * as ScreenOrientation from 'expo-screen-orientation'
import { AssetsContextWrapper } from './contexts/assetsContext'

const Content = memo(() => {
  const { showMenu } = useGame()

  const { width, height, lockScreen } = useScreen()

  useEffect(() => {
    setTimeout(lockScreen, 2000)
  }, [lockScreen])

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

  setTimeout(() => {
    SplashScreen.hideAsync()
  }, 2000)

  return (
    <View
      style={{ width: getScreenSize().height, height: getScreenSize().width }}
    >
      <AssetsContextWrapper>
        <ScreenContextWrapper>
          <GameContextWrapper>
            <Content />
          </GameContextWrapper>
        </ScreenContextWrapper>
      </AssetsContextWrapper>
    </View>
  )
}
