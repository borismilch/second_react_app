import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { Review } from './Review'

export const PaymentForm: React.FC<{shippingData: any, checkoutToken:any, backStep: () => void, handleCaptureCheckout: any, order: any, nextStep: () => void}> = ({shippingData, checkoutToken, backStep, handleCaptureCheckout, order, nextStep}) => {

  const stripePromise = loadStripe('pk_test_51JufUOInFtjHZp0OZN4hIB0C4ahWT6kbo4uqHitHgQBxCTSTamXqXB0tQCa6jDBXrdjBTzhYGwIA7fZbM53LlwKC00lr8S6M1J')
  const handleSubmit = async (e: any, elements: any, stripe: any) => {
    e.preventDefault()

    if (!stripe || !elements) { return }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod( { type: 'card', card: cardElement } )
    if (error) { console.log(error, 'llll') }

    else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { 
          name: 'International', 
          street: 'ioii', town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision, 
          postal_zip_code: shippingData.zip, 
          country: shippingData.shippingCountry
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
    }
    handleCaptureCheckout(checkoutToken.id, orderData)

    nextStep()
  }

  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider/>
      <Typography variant='h6' gutterBottom style={{ margin: '2px 0px' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>

        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={ (e) => handleSubmit(e, elements, stripe) }
            >
              <CardElement />
              <br /> <br />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" onClick={() => backStep()} >Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>

      </Elements>
    </>
  )
}

