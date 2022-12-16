import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAssets as useExpoAssets, Asset } from 'expo-asset'

type NAsset = Asset | undefined

type Assets = {
  images: {
    background: NAsset
    ball: NAsset
    bricks: NAsset
    floor: NAsset
    hoop: NAsset
  }
  sounds: {
    ballKick: NAsset
    hoopKick: NAsset
    score: NAsset
  }
}

const AssestContext = createContext({} as Assets)

export const useAssets = () => useContext(AssestContext)

export const AssetsContextWrapper = (props: PropsWithChildren) => {
  const [_assets, error] = useExpoAssets([
    require('../assets/background.jpg'),
    require('../assets/ball.png'),
    require('../assets/bricks.png'),
    require('../assets/floor.png'),
    require('../assets/hoop.png'),
    require('../assets/sounds/ball_kick.wav'),
    require('../assets/sounds/hoop.mp3'),
    require('../assets/sounds/score.mp3'),
  ])
  return (
    <AssestContext.Provider value={{
      images: {
        background: _assets?.[0],
        ball: _assets?.[1],
        bricks: _assets?.[2],
        floor: _assets?.[3],
        hoop: _assets?.[4],
      },
      sounds: {
        ballKick: _assets?.[5],
        hoopKick: _assets?.[6],
        score: _assets?.[7],
      }
    }}>
      {props.children}
    </AssestContext.Provider>
  )
}
