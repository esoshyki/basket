import Matter from 'matter-js'
import { memo, useEffect, useState } from 'react'
import { Button, ImageBackground, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { useScreen } from '../contexts/screenContext'
import { getEntities } from './entities'
import { ContolsPhysics } from './entities/physics/controlles'
import { useGame } from '../contexts/gameContext'
import { addCollisionListener } from './collisions'
import ResetIcon from './svg'
import { useAssets } from '../contexts/assetsContext'


const Game = memo(function () {
  const { entities, showMenu, setShowMenu } = useGame()
  const { images } = useAssets()

  const [running, setRunning] = useState(false)
  const screen = useScreen()

  useEffect(() => {
    setRunning(!showMenu)
  }, [showMenu, setRunning])

  useEffect(() => {
    if (entities) {
      addCollisionListener(entities)
    }
  }, [entities, addCollisionListener])

  return (
    <View
      style={{
        flex: 1,
        height: screen.height,
        width: screen.width,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      onTouchStart={() => setRunning(true)}
    >
      <View
        style={{ position: 'absolute', right: 20, top: 20, zIndex: 5 }}
        onTouchEnd={() => setShowMenu(true)}
      >
        <ResetIcon />
      </View>
      {images.background && <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          height: '100%',

          zIndex: 1,
        }}
        source={images.background}
        resizeMode={'cover'}
      />}
      <GameEngine
        entities={entities}
        running={running}
        systems={[ContolsPhysics]}
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

export default Game
