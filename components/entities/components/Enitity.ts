import { Position, ScreenSize } from "../interfaces"
import Matter from "matter-js"

export abstract class Entity {
  body: Matter.Body
  pos: Position
  width: number
  height: number
  background: string
  renderer: JSX.Element | null
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

  addToWorld() {
    Matter.World.add(this.world, this.body);
  }
  abstract resetProps(screen: ScreenSize) : void
}
