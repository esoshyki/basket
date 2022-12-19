import { memo, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getScreenSize } from '../../helpers/getScreenSize'

export default memo(function Goal({ hide }: { hide: () => void }) {
  useEffect(() => {
    setTimeout(hide, 1000)
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.text}>NICE SHOT!</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: 40,
    width: 200,
    top: getScreenSize().height / 2 - 20,
    left: getScreenSize().width / 2 - 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    color: 'yellow',
    textShadowColor: '#fff',
  },
})
