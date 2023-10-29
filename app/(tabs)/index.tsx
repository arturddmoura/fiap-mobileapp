import { FlatList, StyleSheet } from 'react-native'

import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '../../components/Themed'
import Card from '../appcomponents/card'
import { products } from '../products'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products}
        renderItem={({ item }) => {
          return <Card product={item} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
