import Matter from 'matter-js'
import { memo, useEffect, useState } from 'react'
import { View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { useScreen } from '../contexts/screenContext'
import { getEntities } from './entities'
import { Physics } from './entities/physics'
import GameCTXWrapper, { useGame } from './GameCTX'

const Game = memo(function () {
  const [entities] = useState(getEntities())
  const { running, startGame } = useGame()
  const screen = useScreen()

  useEffect(() => {
    console.log('effect');
    entities.WallLeft.resetProps(screen)
    entities.WallRight.resetProps(screen)
    entities.Floor.resetProps(screen)
    entities.Ball.resetProps(screen)
  }, [screen])

  return (
    <View
      style={{ flex: 1, height: screen.height, width: screen.width }}
      onTouchStart={startGame}
    >
      <GameEngine
        entities={getEntities()}
        running={running}
        systems={[Physics]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </View>
  )
})

export default function () {
  return (
    <GameCTXWrapper>
      <Game />
    </GameCTXWrapper>
  )
}
