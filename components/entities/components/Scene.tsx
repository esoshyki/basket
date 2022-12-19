import Matter from 'matter-js'
import { ImageBackground, View, ViewComponent } from 'react-native'
import { Enteties } from '..'
import { getScreenSize } from '../../../helpers/getScreenSize'
import { SCENE_HEIGHT, SCENE_WIDTH } from '../constants'
import SceneBackground from '../../../assets/background.jpg'
import { Ball } from './Ball'
import React from 'react'

class Camera {
  x: number
  y: number
  ball: Ball
  setCameraPos: ((a: {x: number, y: number}) => void)

  constructor(
    ball: Ball,
    setCameraPos: ((a: {x: number, y: number}) => void)
  ) {
    this.ball = ball
    this.x = 0
    this.y = 0
    this.setCameraPos = setCameraPos
  }

  followTheBall() {
    const ballPos = this.ball.body.position
    const ballX = ballPos.x
    const ballY = ballPos.y
    const screenWidth = getScreenSize().width
    const screenHeight = getScreenSize().height

    let y: number = ballPos.y,
      x: number = ballPos.x

    if (screenHeight / 2 + ballY > SCENE_HEIGHT) {
      y = SCENE_HEIGHT - screenHeight / 2
    }

    if (ballY - screenHeight / 2 < 0) {
      y = screenHeight / 2
    }

    if (ballX + screenWidth / 2 > SCENE_WIDTH) {
      x = SCENE_WIDTH - screenWidth / 2
    }

    if (ballX - screenWidth / 2 < 0) {
      x = screenWidth / 2
    }

    this.x = x
    this.y = y

    this.setCameraPos({x: -(x - screenWidth / 2), y: -(y - screenHeight / 2)})

  }
}

export class Scene {
  camera: Camera
  width: number
  height: number
  pos: { x: number; y: number }

  constructor(
    ball: Ball,
    sceneRef: any
  ) {
    this.resetProps()
    this.camera = new Camera(ball, sceneRef)
  }

  resetProps(): void {
    this.width = SCENE_WIDTH
    this.height = SCENE_HEIGHT
    this.pos = {
      x: SCENE_WIDTH / 2,
      y: SCENE_HEIGHT / 2,
    }
  }
}
