import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import useStyles from './cardItemStyle'
import { ITfuncs } from '../../../types/interfaces'

export const CardItem: React.FC<{item: any, funcs: ITfuncs }> = ({item, funcs}) => {
  const classes = useStyles()
  return (
    <>
      <Card>
        <CardMedia image={item.image.url} className={classes.media} />
        <CardContent className={classes.cardContent} >

          <Typography variant='h4'>{item.name}</Typography>
          <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>

        </CardContent>
        <CardActions className={classes.cartActions}>

          <div className={classes.buttons}>

            <Button onClick={() => funcs.handleToUpdateQuantity(item.id, item.quantity - 1)} type='button' size='small'>-</Button>
            <Typography>{item.quantity}</Typography>
            <Button onClick={() => funcs.handleToUpdateQuantity(item.id, item.quantity + 1)} type='button' size='small'>+</Button>

          </div>

          <Button variant='contained' type='button' onClick={() => funcs.handleRemoveFromQuantity(item.id)} color='secondary'>Remove</Button>

        </CardActions>
      </Card>
    </>
  )
}
