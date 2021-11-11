import React, {useContext} from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import Context from '../../context'

import useStyles from './style'

export const Product: React.FC<{product: any}> = ({product}) => {
  const classes = useStyles()
  const { handleAddCart } = useContext(Context)
  return (
    <Card style={{flexGrow: 1}} className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name}></CardMedia>
      <CardContent>
        <div className={classes.cardContent}>

          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>

        </div>

        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>

      <CardActions>

        <IconButton onClick={handleAddCart!.bind(null, product.id, 1)} arial-label='Add to Card'>
          <AddShoppingCart />
        </IconButton>

      </CardActions>
    </Card>
  )
}