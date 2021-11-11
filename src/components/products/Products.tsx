import React from 'react'
import {Grid} from '@material-ui/core'
import { Product } from './Product'
import { IProduct } from '../../types/interfaces'


import useStyles from './style2'

export const Products: React.FC<{products: IProduct[]}> = ({products }) => {
  const classes = useStyles()
  return (
    <main style={{paddingTop: 80}} className={classes.content}>
      <div className={classes.toolbar}>
        <Grid justifyContent="center" container spacing={4}>
          {products.map(prod => 
            <Grid container item key={prod.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={prod} />
            </Grid>
          )}
        </Grid>
      </div>

    </main>
  )
}