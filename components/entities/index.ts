import Matter from 'matter-js'
import React from 'react'
import { ViewComponent } from 'react-native'
import { Ball } from './components/Ball'
import { Ceiling } from './components/Ceiling'
import { Controls } from './components/Controls'
import { Floor } from './components/Floor'
import { Hoop } from './components/Hoop'
import { Scene } from './components/Scene'
import { Splayer } from './components/SoundPlayer'
import { Statistics } from './components/Statistic'
import { LeftWall, RightWall } from './components/Wall'

export const getEntities = (sceneRef: any) => {
  let engine = Matter.Engine.create({ enableSleeping: false })
  let world = engine.world
  engine.gravity.y = 0.5

  const ball = new Ball(world);

  return {
    physics: { engine, world },
    Ball: ball,
    Scene: new Scene(ball, sceneRef),
    Floor: new Floor(world),
    WallLeft: new LeftWall(world),
    WallRight: new RightWall(world),
    Ceiling: new Ceiling(world),
    Controls: new Controls(),
    Hoop: new Hoop(world),
    Sound: new Splayer(),
    Statistic: new Statistics()
  }
}

export type Enteties = ReturnType<typeof getEntities>;