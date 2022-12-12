import Matter, {} from "matter-js";

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
  body: Matter.Body,
  props: GameEntityProps
}

