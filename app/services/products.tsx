export interface ProductItem {
  productId: number
  price: number
  name: string
  picture: string
  description: string
  availableQuantity: number
}

export const getProducts = async () => {
  const res = await fetch(`https://fiap-api.onrender.com/api/Product/`)
  return res.json()
}
