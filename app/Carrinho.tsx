import { StyleSheet } from 'react-native'

import { View } from '../components/Themed'
import Cart from './appcomponents/cart'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Cart />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
