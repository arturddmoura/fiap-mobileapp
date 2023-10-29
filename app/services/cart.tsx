export interface CartItem {
  id: number
  product_id: number
  price: number
  quantity: number
  available_quantity: number
  name: string
  description: string
  picture: string
}

export const getCart = async () => {
  const res = await fetch(`http://mock-api-c1ch.onrender.com/cart`)
  return res.json()
}

export const addToCart = (formData: CartItem) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  }
  return fetch(`http://mock-api-c1ch.onrender.com/cart/`, requestOptions)
}

export const deleteFromCart = (itemId: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  return fetch(
    `http://mock-api-c1ch.onrender.com/cart/${itemId}`,
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
      `http://mock-api-c1ch.onrender.com/cart/${id}`,
      requestOptions
    )

    if (response.ok) {
      lastStatus = response.status
    }
  }

  return { status: lastStatus }
}
