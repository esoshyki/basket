import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getEntities } from '../components/entities'
import { ViewComponent } from 'react-native'
import { Audio, AVPlaybackSource } from 'expo-av'

type Entities = ReturnType<typeof getEntities>

const GameContext = createContext(
  {} as {
    entities: Entities
    setEntities: (v?: Entities) => void
    initGame: () => void
    showMenu: boolean
    setShowMenu: (v: boolean) => void
    playMusic: () => void
    cameraPos: {x: number, y: number}
  }
)

export const useGame = () => useContext(GameContext)

export default function GameContextWrapper(props: PropsWithChildren) {
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0});
  const [entities, setEntities] = useState<ReturnType<typeof getEntities>>()
  const [showMenu, setShowMenu] = useState(true)
  const [phoneMusicPlayed, setPhoneMusicPlayed] = useState(false)

  const track =
    'https://firebasestorage.googleapis.com/v0/b/su-10-ee191.appspot.com/o/tracks%2Fbbv.mp3?alt=media&token=72fd4d38-76c5-4d8f-9a79-2ab31d67e1db'

  const initGame = useCallback(() => {
    setEntities(getEntities(setCameraPos))
  }, [entities])

  const playMusic = async () => {
    if (!phoneMusicPlayed) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: track } as AVPlaybackSource,
        { isLooping: true, volume: 0.05 }
      )
      await sound.playAsync()
      setPhoneMusicPlayed(true)
    }
  }

  useEffect(() => {
    if (entities) {
      entities.Ceiling.addToWorld()
      entities.Floor.addToWorld()
      entities.Hoop.addToWorld()
      entities.WallLeft.addToWorld()
      entities.WallRight.addToWorld()
      entities.Ball.addToWorld()
      setShowMenu(false)
    }
  }, [entities, setShowMenu])

  useEffect(() => {
    playMusic()
  }, [playMusic])

  return (
    <GameContext.Provider
      value={{
        entities,
        setEntities,
        initGame,
        showMenu,
        setShowMenu,
        playMusic,
        cameraPos
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}
