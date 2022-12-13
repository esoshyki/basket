import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'

const GameContext = createContext(
  {} as {
    running: boolean
    startGame: () => void
    pauseGame: () => void
  }
)

export const useGame = () => useContext(GameContext)

export default function GameCTXWrapper({ children }: PropsWithChildren) {
  const [running, setRunning] = useState(false)

  const startGame = useCallback(() => {
    if (!running) {
      setRunning(true)
    }
  }, [])

  const pauseGame = useCallback(() => {
    if (running) {
      setRunning(false)
    }
  }, [])

  return (
    <GameContext.Provider
      value={{
        running,
        startGame,
        pauseGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
