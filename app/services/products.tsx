export interface ProductItem {
  id: number
  price: number
  name: string
  picture: string
  description: string
  available_quantity: number
}

export const getProducts = async () => {
  const res = await fetch(`https://mock-api-c1ch.onrender.com/products`)
  return res.json()
}
