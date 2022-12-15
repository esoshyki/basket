import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, Text, Button } from 'react-native'
import { getTimeString } from '../../../helpers/getTimeString'

const StatisticsComponent = (props: Statistics) => {

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width: getScreenSize().width,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>{`Score: ${props.scores.score}`}</Text>
      <Text>{props.timeString}</Text>
      <Text>{`Hits: ${props.scores.hits}`}</Text>
      <Text>{`Hits per minute: ${props.scores.hitsPerMinute}`}</Text>
    </View>
  )
}

export class Statistics {
  renderer: JSX.Element
  timeStart: Date
  timeString: string
  scores: {
    shots: number
    hits: number
    hitsPerMinute: string
    score: number
  }
  constructor() {
    this.renderer = <StatisticsComponent {...this} />
    this.timeStart = new Date()
    this.timeString = getTimeString(this.timeStart, new Date())
    this.scores = {
      shots: 0,
      hits: 0,
      hitsPerMinute: '0',
      score: 0,
    }
  }

  addHit = () => {
    this.scores.hits += 1
    this.calculateHitsPerMinute()
    this.scores.score += 50
  }

  calculateHitsPerMinute = () => {
    if (!this.scores.hits) {
      this.scores.hitsPerMinute = '0'
      return
    }
    this.scores.hitsPerMinute = (
      this.scores.hits /
      ((Number(new Date()) - Number(this.timeStart)) / 60000)
    ).toFixed(2)
  }

  calculateTimeString = () => {
    this.timeString = getTimeString(this.timeStart, new Date())
  }

  calculateStatistic = () => {
    this.calculateHitsPerMinute()
    this.calculateTimeString()
  }
}
