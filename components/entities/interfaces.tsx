import Matter from 'matter-js'

export interface IEntity {
  body: Matter.Body
  pos: Position
  width: number
  height: number
  background: string
  renderer: JSX.Element
}

export abstract class Entity {
  body: Matter.Body
  pos: Position
  width: number
  height: number
  background: string
  renderer: JSX.Element
  world: Matter.World
  constructor(world: Matter.World) {
    this.world = world
    this.pos = { x: 0, y: 0 }
  }
  setPosition(pos: Position) {
    this.pos = pos;
  }

  setSize(width: number, height: number) {
    this.width = width
    this.height = height
  }
  abstract resetProps(screen: ScreenSize) : void
}

export abstract class SoundPlayer {
  actions: {
    [k: string] : string
  }

  abstract playSound(type: keyof typeof this.actions) : void
}

export type World = Matter.World

export type Position = {
  x: number
  y: number
}

export type GameEntityProps = {
  world: World
  width: number
  height: number
  background: string
  pos: Position
}

export type GameComponentsProps = {
  body: Matter.Body
  props: GameEntityProps
}

export type ScreenSize = {
  width: number
  height: number
}

export interface InitialProps {
  x: number
  y: number
  width: number
  height: number
}
