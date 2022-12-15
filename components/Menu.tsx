import { Button, View, Text } from 'react-native'
import { useGame } from '../contexts/gameContext'
import { getScreenSize } from '../helpers/getScreenSize'

export default function Menu() {
  const { initGame } = useGame()

  const { width, height } = getScreenSize()

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        justifyContent: 'center',
        width,
        height,
        backgroundColor: '#000',
        zIndex: 3
      }}
    >
      <Text>Menu</Text>
      <Button title="Start game" onPress={initGame} />
    </View>
  )
}
