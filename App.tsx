import { StatusBar, View } from 'react-native'
import Game from './components/Game'

import { Fragment, useState } from 'react'
import ScreenContextWrapper, { useScreen } from './contexts/screenContext'

function Content() {
  const { isLocked } = useScreen()

  return (
    <View style={{ flex: 1, position: 'relative', top: 0, left: 0, width: '100%', height: '100%'}}>
      <Game />
      <StatusBar hidden />
    </View>
  )
}

export default function App() {
  return (
    <ScreenContextWrapper>
      <Content />
    </ScreenContextWrapper>
  )
}
