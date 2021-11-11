import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles'

import logo from '../../assets/commerce.png'
export const NavBar: React.FC<{badgeContent: number}> = ({badgeContent}) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>

        <Toolbar>
         
          <Typography  variant='h6' className={classes.appBar} color='inherit' style={{border: 'none'}} >
            <img onClick={() => history.push('/')} src={logo} alt="hui"  height="25px" className ={ classes.image } />
          </Typography>
          
          <div className={classes.grow} />
          {/* <div className={classes.button} /> */}
          { location.pathname === '/' &&

          <IconButton onClick={() => history.push('/cart')} aria-label='Show cart item' color="inherit">
            <Badge badgeContent={badgeContent} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          }
        </Toolbar>
      </AppBar>
    </>
  )
}



