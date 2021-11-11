import React, {useEffect, useState} from 'react';
import { commerce } from './lib/commerce'
import { Products, NavBar, Cart, CheckOut } from './components'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Context from './context';


const App: React.FC = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState<{total_items?: number}>({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchCard = async () => {
    console.log(await commerce.cart.retrieve())
    setCart(await commerce.cart.retrieve())
  }

  const fetchProdcts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data as [])
  }

  const handleAddCart = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const handleToUpdateQuantity = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const handleRemoveFromQuantity = async (productId: string) => {
    const {cart} = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyFromQuantity = async () => {
    const {cart} = await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }

  const handleCaptureCheckout = async(checkoutTokenId: string, newOrder: any) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

      setOrder(incomingOrder)
      refreshCart()
    } catch(e) { console.log(e, checkoutTokenId, newOrder); setErrorMessage('') }
  }

  useEffect(() => {
    fetchProdcts()
    fetchCard()
  }, [])

  

  return (
    <Router>
      <Context.Provider value={{handleAddCart}}>
       <div style={{maxWidth: '100vw', overflowX: 'hidden'}}>
        <NavBar badgeContent={cart.total_items!} />

        <Switch>
          <Route path='/' render={() => <Products products={products} />}exact />
          <Route path='/cart' render={() => <Cart funcs={{ handleToUpdateQuantity, handleRemoveFromQuantity, handleEmptyFromQuantity }} cart={cart} />} exact />
          <Route path='/checkout' exact >
            <CheckOut cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>

      </div>
    </Context.Provider>

    </Router>

    
  );
}

export default App;
