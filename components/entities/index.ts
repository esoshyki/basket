import Matter from 'matter-js'
import { Ball } from './components/Ball'
import { Ceiling } from './components/Ceiling'
import { Controls } from './components/Controls'
import { Floor } from './components/Floor'
import { Hoop } from './components/Hoop'
import { Splayer } from './components/SoundPlayer'
import { Statistics } from './components/Statistic'
import { LeftWall, RightWall } from './components/Wall'

export const getEntities = () => {
  let engine = Matter.Engine.create({ enableSleeping: false })
  let world = engine.world
  engine.gravity.y = 0.5

  return {
    physics: { engine, world },
    Ball: new Ball(world),
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