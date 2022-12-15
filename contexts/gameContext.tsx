import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getEntities } from '../components/entities'

type Entities = ReturnType<typeof getEntities>

const GameContext = createContext(
  {} as {
    entities: Entities
    setEntities: (v?: Entities) => void
    initGame: () => void
    showMenu: boolean
    setShowMenu: (v: boolean) => void
  }
)

export const useGame = () => useContext(GameContext)

export default function GameContextWrapper(props: PropsWithChildren) {
  const [entities, setEntities] = useState<ReturnType<typeof getEntities>>()
  const [showMenu, setShowMenu] = useState(true)

  const initGame = useCallback(() => {
    setEntities(getEntities())
  }, [entities])

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

  return (
    <GameContext.Provider
      value={{
        entities,
        setEntities,
        initGame,
        showMenu,
        setShowMenu,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}
