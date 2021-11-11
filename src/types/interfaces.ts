export interface IProduct {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export interface ProductsProps {
  handleAddCart: (productId: string, quantity: number) => void
}

export interface ICart {
  line_items: Array<any>
  subtotal: any
  total_items?: number
}
export interface ITfuncs {
  handleToUpdateQuantity: (productId: string, quantity: number) => void
  handleRemoveFromQuantity: (productId: string) => void
}

export interface IFuncs extends ITfuncs {
  handleEmptyFromQuantity: () => void
}


export interface CustomFormProps {
  name: string
  label: string
  required: boolean
}