import Matter from 'matter-js'
import { memo, useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { useScreen } from '../contexts/screenContext'
import { getEntities } from './entities'
import { BallPhysics } from './entities/physics/ball'
import { ContolsPhysics } from './entities/physics/controlles'
import GameCTXWrapper, { useGame } from './GameCTX'
import bg from '../assets/background.png'

const Game = memo(function () {
  const [entities] = useState(getEntities())
  const { running, startGame } = useGame()
  const screen = useScreen()

  useEffect(() => {
    entities.WallLeft.resetProps(screen)
    entities.WallRight.resetProps(screen)
    entities.Floor.resetProps(screen)
    entities.Ball.resetProps(screen)
  }, [screen])

  return (
    <View
      style={{
        flex: 1,
        height: screen.height,
        width: screen.width,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      onTouchStart={startGame}
    >
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          height: '100%',

          zIndex: -1,
        }}
        source={bg}
        resizeMode={'cover'}
      />
      <GameEngine
        entities={getEntities()}
        running={running}
        systems={[BallPhysics, ContolsPhysics]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      ></GameEngine>
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
