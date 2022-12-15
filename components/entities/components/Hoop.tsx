
import { Entity, ScreenSize } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, ImageBackground } from 'react-native'
import { useAssets } from '../../../contexts/assetsContext'

const HoopComponent = (props: any) => {
  const { images } = useAssets()

  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  return (
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <ImageBackground
        source={images.hoop}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      />
    </View>
  )
}

interface IHoop {
  verges: {
    leftVerge: Matter.Body
    rightVerge: Matter.Body
  }
  ballInBasket: boolean
  setBallInBasket: (v: boolean) => void
  ballColides: (ball: Matter.Body) => boolean
  ballEntersFromBottom: boolean
  ballInNet: boolean
  setBallInNet: (v: boolean) => void
}

export class Hoop extends Entity implements IHoop {
  verges: { leftVerge: Matter.Body; rightVerge: Matter.Body }
  ballInBasket: boolean
  ballColides: (ball: Matter.Body) => boolean
  ballEntersFromBottom: boolean
  ballInNet: boolean
  constructor(world: Matter.World) {
    const { width, height } = getScreenSize()
    const max = Math.max(width, height)
    super(world)
    this.height = 40
    this.width = 40
    this.pos.x = 50
    this.pos.y = getScreenSize().height - 250
    this.background = 'green'
    this.renderer = <HoopComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isSensor: true, isStatic: true, label: 'Hoop' }
    )
    this.ballInBasket = false
    this.ballEntersFromBottom = false
    this.ballInNet = false
    this.verges = {
      leftVerge: Matter.Bodies.circle(
        this.pos.x - this.width / 2 + 2,
        this.pos.y - this.height / 2 - 2,
        2,
        { isStatic: true, friction: 1, label: 'LeftHoopVerge' }
      ),
      rightVerge: Matter.Bodies.circle(
        this.pos.x + this.width / 2 + 2,
        this.pos.y - this.height / 2 - 2,
        2,
        { isStatic: true, friction: 1, label: 'RightHoopVerge' }
      ),
    }
  }

  setBallEntersFromBottom = (v: boolean) => {
    this.ballEntersFromBottom = v
  }

  resetProps = (screen: ScreenSize): void => {
    this.height = 40
    this.width = 40
    this.pos.x = 50
    this.pos.y = screen.height - 150
    Matter.Body.setPosition(this.body, this.pos)
  }

  setBallInBasket(v: boolean) {
    this.ballInBasket = v
  }

  setBallInNet = (v: boolean) => {
    this.ballInNet = v
  }

  ballCollides(ball: Matter.Body) {
    if (
      ball.bounds.max.y + this.height / 2 > this.body.position.y &&
      !this.ballInNet &&
      !this.ballEntersFromBottom
    ) {
      this.setBallInNet(true)
      if (ball.velocity.y > 5) {
        Matter.Body.setVelocity(ball, { x: 0, y: 5 })
      } else {
        Matter.Body.setVelocity(ball, { x: 0, y: ball.velocity.y})
      }
      return true
    }
    return false
  }

  addToWorld(): void {
    Matter.World.add(this.world, this.verges.leftVerge)
    Matter.World.add(this.world, this.verges.rightVerge)
    Matter.World.add(this.world, this.body)
  }
}
