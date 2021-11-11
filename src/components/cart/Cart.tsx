import React, {useEffect} from 'react'
import useStyles from './cartstyle'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { CardItem } from './cartItem/CartItem'
import { Link } from 'react-router-dom'
import { IFuncs } from '../../types/interfaces'
export const Cart: React.FC<{cart: any, funcs: IFuncs}> = ({ cart, funcs }) => {
  const { handleRemoveFromQuantity, handleToUpdateQuantity } = funcs
  const classes = useStyles()

  useEffect(() => {
    console.log(cart)
  }, [])

  const EmptyCard: React.FC = () => {
    return (
      <Typography variant='subtitle1'>
        You have nove items in your card, { <Link to='/' className={classes.link}>start adding some</Link>}!
      </Typography>
    )
  }
  const FilledCart: React.FC = () => {
    if (!cart.line_items) { return (<p>Loading...</p>) }
    return (
      <>
        <Grid container spacing={3}>
          {(cart.line_items || []).map((it: any) => (
            <Grid item xs={12} sm={4} key={it.id} >
              <CardItem funcs={{handleRemoveFromQuantity, handleToUpdateQuantity}} item={it} />
            </Grid>

          ))}
        </Grid>
      <div className={classes.cardDetails}>

        <Typography variant='h4' >
            Subtotal: { cart.subtotal.formatted_with_symbol }
        </Typography>
        <div>
          <Button className={classes.emptyButton} onClick={() => funcs.handleEmptyFromQuantity()} size='large' type='button' variant='contained' color="secondary">Empty Card</Button>
          <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color="primary">CheckOut</Button>
        </div>
      </div>

      </>
    )
  }


  return (
    <>
    <Container style={{maxWidth: 1000}}>
      <div className={classes.toolbar} />
      <Typography  style={{marginBottom: 10}} className={classes.title} variant="h4" >Your Shopping Cart</Typography>
      { !(cart.line_items || []).length ? <EmptyCard /> : <FilledCart /> }
    </Container>

    </>
  )
}

