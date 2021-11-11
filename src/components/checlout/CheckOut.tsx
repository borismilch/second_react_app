import React, { useState, useEffect } from 'react'
import { AddresForm } from './AddresForm'
import { Confirmation } from './confirm/Confirmation'
import { PaymentForm } from './PaymentForm'
import { Link } from 'react-router-dom'

import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './checkoutStyle'

import { commerce } from '../../lib/commerce'

export const CheckOut: React.FC<{cart: any, handleCaptureCheckout: any, order: any, error: any}> = ({cart, handleCaptureCheckout, order, error}) => {
  const classes = useStyles()
  const [shippingData, setShippingData] = useState({})  
  const [checkoutToken, setCheckoutToken] = useState<any>(null)
  const [activeStep, setActiveStep] = useState(0)

  const nextStep = () => setActiveStep((prev) => prev + 1)
  const backStep = () => setActiveStep((prev) => prev - 1)

  const next = (data: any) => {
    setShippingData(data)

    nextStep()
  }
  console.log(shippingData)
  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form: React.FC = () => {
    return (
      checkoutToken &&
        (activeStep === 0 ? <AddresForm next={next} checkoutToken={checkoutToken} /> : 
          <PaymentForm 
            checkoutToken={checkoutToken} 
            shippingData={shippingData} backStep={backStep} 
            handleCaptureCheckout={handleCaptureCheckout}
            order={order}
            nextStep={nextStep}
            
          />)
      
    
    )
  }

  useEffect(() => {
    const generateToken = async() => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        console.log(token)
        setCheckoutToken(token)
        
      } catch(e) { console.log(e, cart.id) }
    }
    generateToken()
  }, [])

  const steps: string[] = ['Shipping address', 'Payment details']
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className ={classes.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step: string) => (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          { activeStep === steps.length? <Confirmation /> : <Form /> }
        </Paper>
      </main>
    </>
  )
}

