import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width / 2 - 30

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { numberFormat } from '../helpers'
import { CartItem, addToCart } from '../services/cart'
import COLORS from './colors'

export default function Card({ product }: { product: any }) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (formData: CartItem) => {
      formData.product_id = formData.id
      formData.quantity = 1
      formData.id = Math.floor(Math.random() * 100000000000) + 1
      return addToCart(formData)
    },
    onSuccess: async (data: { status: number }) => {
      if (data.status == 201) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Produto adicionado ao carrinho',
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        queryClient.invalidateQueries({ queryKey: ['cartNumber'] })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Erro ao adicionar item ao carrinho',
        })
      }
    },
    onError: async () => {
      Toast.show({
        type: 'error',
        text1: 'Erro!',
        text2: 'Erro ao adicionar item ao carrinho',
      })
    },
  })

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={style.card}>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></View>
        </View>

        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}
        >
          <Image
            source={{
              uri: product.picture,
            }}
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: 100,
            }}
          />
        </View>

        <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
          {product.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'normal' }}>
            {numberFormat(product.price)}
          </Text>
          <Text
            onPress={() => mutate(product)}
            style={{ fontSize: 22, color: COLORS.orange, fontWeight: 'bold' }}
          >
            +
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
  categoryTextSelected: {
    color: COLORS.orange,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.orange,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
