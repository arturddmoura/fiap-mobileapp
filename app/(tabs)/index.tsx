import { useQuery } from '@tanstack/react-query'
import { FlatList, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { View } from '../../components/Themed'
import Card from '../appcomponents/card'
import COLORS from '../appcomponents/colors'
import { getProducts } from '../services/products'

export default function TabOneScreen() {
  const { data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator animating={true} color={COLORS.orange} />
      </View>
    )
  }

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
        data={data}
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
