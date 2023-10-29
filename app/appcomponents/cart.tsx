import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import { Button, List, IconButton } from 'react-native-paper'
import { numberFormat } from '../helpers'
import { cartItems } from '../products'
import COLORS from './colors'

export default function Cart() {
  let totalPrice = 0

  for (const item of cartItems) {
    totalPrice += item.price * item.quantity
  }

  return (
    <View>
      <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <ScrollView style={{ padding: 16 }}>
          {cartItems.map((item, index) => (
            <List.Section key={index}>
              <View>
                <List.Item
                  title={item.name}
                  right={() => (
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                  )}
                  left={() => (
                    <View
                      style={{
                        height: 100,
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={{
                          uri: item.picture,
                        }}
                        style={{
                          flex: 1,
                          resizeMode: 'contain',
                          width: 164,
                        }}
                      />
                    </View>
                  )}
                  description={`${numberFormat(item.price * item.quantity)} (${
                    item.quantity
                  } unidades)`}
                />
              </View>
            </List.Section>
          ))}
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
            Total: {numberFormat(totalPrice)}
          </Text>
        </ScrollView>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button
          style={{ width: '90%' }}
          buttonColor={COLORS.orange}
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Finalizar pedido
        </Button>
      </View>
    </View>
  )
}
