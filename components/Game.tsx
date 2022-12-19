import Matter from 'matter-js'
import { memo, useEffect, useRef, useState } from 'react'
import { Text, ImageBackground, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { useScreen } from '../contexts/screenContext'
import { getEntities } from './entities'
import { ContolsPhysics } from './entities/physics/controlles'
import { useGame } from '../contexts/gameContext'
import { addCollisionListener } from './collisions'
import ResetIcon from './svg'
import { useAssets } from '../contexts/assetsContext'
import { SCENE_HEIGHT, SCENE_WIDTH } from './entities/constants'
import SceneBackground from '../assets/background.jpg'
import { Statistics } from './entities/components/Statistic'

const Game = memo(function () {
  const { entities, showMenu, setShowMenu, cameraPos } = useGame()
  const { images } = useAssets()

  const [gameEngine, setGameEngine] = useState<any>(null)

  const statisitcs: Statistics | undefined =
    gameEngine?.state?.entities?.Statistic

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
      {statisitcs && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 7,
            justifyContent: 'space-around',
          }}
        >
          <Text style={{ color: "yellow", fontWeight: 'bold' }}>{`Score: ${statisitcs.scores.score}`}</Text>
          <Text style={{ color: "yellow", fontWeight: 'bold' }}>{statisitcs.timeString}</Text>
          <Text style={{ color: "yellow", fontWeight: 'bold' }}>{`Hits: ${statisitcs.scores.hits}`}</Text>
          <Text style={{ color: "yellow", fontWeight: 'bold' }}>{`Hits per minute: ${statisitcs.scores.hitsPerMinute}`}</Text>
          <ResetIcon onTouch={() => setShowMenu(true)} />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          left: cameraPos.x,
          top: cameraPos.y,
          zIndex: 1,
          width: SCENE_WIDTH,
          height: SCENE_HEIGHT,
        }}
      >
        <ImageBackground
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/su-10-ee191.appspot.com/o/images%2Fsan-francisco.jpg?alt=media&token=1d7c162b-39e4-41c1-b2a7-2b5bbe085fe5',
          }}
          resizeMode="contain"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
        />
        <GameEngine
          ref={(ref) => setGameEngine(ref)}
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
    </View>
  )
})

export default Game
