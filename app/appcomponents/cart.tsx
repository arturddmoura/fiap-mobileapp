import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { ActivityIndicator, Button, IconButton, List } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { numberFormat } from '../helpers'

import {
  CartItem,
  deleteAllFromCart,
  deleteFromCart,
  getCart,
} from '../services/cart'
import COLORS from './colors'

export default function Cart() {
  const queryClient = useQueryClient()

  const { data: dbdata, isFetching } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  })

  const data = dbdata?.result ?? []

  const [loading, setLoading] = React.useState(false)
  const [loadingDelete, setLoadingDelete] = React.useState(false)

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      setLoadingDelete(true)
      return deleteFromCart(id)
    },
    onSuccess: async (data: { status: number }) => {
      if (data.status == 204) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Produto removido com sucesso',
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setLoadingDelete(false)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Falha ao remover produto',
        })
        setLoadingDelete(false)
      }
    },
    onError: async () => {
      Toast.show({
        type: 'error',
        text1: 'Erro!',
        text2: 'Falha ao remover produto',
      })
      setLoadingDelete(false)
    },
  })

  const { mutate: checkout, isFetching: isLoadingCheckout }: any = useMutation({
    mutationFn: () => {
      setLoading(true)
      const itemIds: Array<number> = data.map((item: CartItem) => item.id)
      return deleteAllFromCart(itemIds)
    },
    onSuccess: async (data: { status: number }) => {
      if (data.status == 204) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Pedido realizado com sucesso',
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setLoading(false)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Falha ao realizar pedido',
        })
        setLoading(false)
      }
    },
    onError: async () => {
      Toast.show({
        type: 'error',
        text1: 'Erro!',
        text2: 'Falha ao realizar pedido',
      })
      setLoading(false)
    },
  })

  let totalPrice = 0

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

  if (data) {
    if (data.length == 0) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
            }}
          >
            Seu carrinho está vazio
          </Text>
        </View>
      )
    }

    for (const item of data) {
      totalPrice += item.product.price * item.quantity
    }
  }

  return (
    <View>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <ScrollView>
          {data &&
            data.map((item: CartItem, index: number) => (
              <List.Section key={index}>
                <View>
                  <List.Item
                    title={item.product.name}
                    right={() => (
                      <IconButton
                        disabled={loadingDelete}
                        icon="delete"
                        size={20}
                        onPress={() => mutate(item.id ?? 0)}
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
                            uri: item.product.picture,
                          }}
                          style={{
                            flex: 1,
                            resizeMode: 'contain',
                            width: 164,
                          }}
                        />
                      </View>
                    )}
                    description={`${numberFormat(
                      item.product.price * item.quantity
                    )} (${item.quantity} unidades)`}
                  />
                </View>
              </List.Section>
            ))}
          <View
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                paddingLeft: 10,
                paddingBottom: 10,
              }}
            >
              Total: {numberFormat(totalPrice)}
            </Text>
            <Button
              loading={loading}
              style={{ width: '100%' }}
              buttonColor={COLORS.orange}
              mode="contained"
              onPress={() => checkout()}
            >
              Finalizar pedido
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
