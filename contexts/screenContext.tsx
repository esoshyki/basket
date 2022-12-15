import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { getScreenSize } from '../helpers/getScreenSize'
import * as ScreenOrientation from 'expo-screen-orientation'

interface IScreen {
  width: number
  height: number
  isLocked: boolean
  lockScreen: () => void;
}

const ScreenContext = createContext({ width: 0, height: 0 } as IScreen)

export const useScreen = () => useContext(ScreenContext)

export default function screenSizeWrapper(props: PropsWithChildren<any>) {
  const size = getScreenSize()

  const [width, setWidth] = useState(size.width)
  const [height, setHeight] = useState(size.height)
  const [isLocked, setIsLocked] = useState(false)

  const calcScreenSize = () => {
    const { width, height } = getScreenSize()
    setWidth(width)
    setHeight(height)
  }

  const lockScreen = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    )
    setIsLocked(true);
    calcScreenSize();
  }

  return (
    <ScreenContext.Provider value={{ width, height, isLocked, lockScreen }}>
      {props.children}
    </ScreenContext.Provider>
  )
}
