import constants from "../constants";
import { GameEntityProps, Position } from "../interfaces";
import { getScreenSize } from "../../../helpers/getScreenSize";
import Matter from "matter-js";
import { View } from "react-native";

const BallComponent = (props: any) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const background = props.background;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        position: "absolute",
        left: xBody,
        top: yBody,
        backgroundColor: background,
        width: widthBody,
        height: heightBody,
        borderRadius: widthBody / 2,
      }}
    />
  );
};

function Ball(props: GameEntityProps): any {
  const initialBall = Matter.Bodies.circle(
    props.pos.x,
    props.pos.y,
    props.width,
    { label: "Ball", restitution: 0.8 }
  );
  Matter.World.add(props.world, initialBall);
  return {
    body: initialBall,
    ...props,
    renderer: <BallComponent />,
  };
}

export const getInitialBallPosition = () : Position => {
  const screen = getScreenSize();
  const ballSize = constants.BALL_SIZE;
  return ({
      x: (screen.width - ballSize) / 2,
      y: (screen.height - ballSize) / 2,
    })
}

export const createBall = (world: Matter.World) => {


  return Ball({
    world,
    background: "red",
    pos: getInitialBallPosition(),
    width: constants.BALL_SIZE,
    height: constants.BALL_SIZE,
  });
};
