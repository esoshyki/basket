import Matter from 'matter-js'
import { Position } from '../interfaces'

type TouchEvent = {
  pos: Position
  time: Date
}

interface TouchControl {
  touchStart: TouchEvent | null
  touchEnd: TouchEvent | null

  setTouchStart(te: TouchEvent): void

  setTouchEnd(te: TouchEvent): void

  useForce(body: Matter.Body): void
}

export class Controls implements TouchControl {
  touchStart: TouchEvent | null
  touchEnd: TouchEvent | null
  constructor() {
    this.touchStart = null
    this.touchEnd = null
  }

  setTouchEnd(te: TouchEvent): void {
    this.touchEnd = te
  }

  setTouchStart(te: TouchEvent): void {
    this.touchStart = te
  }

  useForce(body: Matter.Body) {
    if (this.touchStart && this.touchEnd) {
      const k = 0.05
      const x = k * (this.touchEnd.pos.x - this.touchStart.pos.x)
      const y = k * (this.touchEnd.pos.y - this.touchStart.pos.y)
      const vector = { x, y }

      Matter.Body.setVelocity(body, vector)
      this.touchEnd = null
      this.touchStart = null
    }
  }
}
