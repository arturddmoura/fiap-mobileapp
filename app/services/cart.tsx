import { ProductItem } from './products'

export interface CartItem {
  id?: number
  productId: number
  quantity: number
  product: ProductItem
}

export const getCart = async () => {
  const res = await fetch(`https://fiap-api.onrender.com/api/Cart/`)
  return res.json()
}

export const addToCart = (formData: {
  productId: number
  quantity: number
}) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  }
  return fetch(`https://fiap-api.onrender.com/api/Cart/`, requestOptions)
}

export const deleteFromCart = (itemId: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  return fetch(
    `https://fiap-api.onrender.com/api/Cart/${itemId}`,
    requestOptions
  )
}

export const deleteAllFromCart = async (
  itemIds: Array<number>
): Promise<{ status: number }> => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }

  let lastStatus = 0

  for (const id of itemIds) {
    const response = await fetch(
      `https://fiap-api.onrender.com/api/Cart/${id}`,
      requestOptions
    )

    if (response.ok) {
      lastStatus = response.status
    }
  }

  return { status: lastStatus }
}
