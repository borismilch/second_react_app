import React, { createContext } from 'react'
import { ProductsProps } from './types/interfaces' 

const Context = createContext<Partial<ProductsProps>>({})

export default Context