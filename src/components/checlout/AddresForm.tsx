import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { InputLabel, MenuItem, Button, Grid, Typography, Select } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { CustomTextField } from './CustomTextField'
import { Link } from 'react-router-dom'
import { commerce } from '../../lib/commerce'

interface ICountry{
  [name: string]: string
}

export const AddresForm: React.FC<{checkoutToken: any, next: (data: any) => void }> = ({checkoutToken, next}) => {
  const methods = useForm()

  const [shippingCountries, setShippingCountries] = useState<{[key: string]: string}>({}) 
  const [shippingCountry, setShippingCountry] = useState<string>('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState<any>([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState<any>([])
  const [shippingOption, setShippingOption] = useState<string>('')

  const options = shippingOptions.map((so: any) => ({id: so.id, label: `${so.description} - ${so.price.formatted_with_symbol}`}) )


  const fetchShippingCountries = async (id: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(id)

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }
  const countriesArr = Object.entries(shippingCountries).map( ([id, label]) => ({id, label}) )
  const subDivisionsArr = Object.entries(shippingSubdivisions).map( ([id, label]) => ({id, label}) )

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippinOptions = async (checkoutToken: any, country: string, region?: string ) => {
    const options = await commerce.checkout.getShippingOptions(checkoutToken.id, { country, region })
    console.log(options,'opptions')
    setShippingOptions(options)
   
  }
  
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)

  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect (() => {
    if(shippingSubdivision) fetchShippinOptions(checkoutToken, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Addres</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingOption, shippingSubdivision, shippingCountry}))} >
          <Grid container spacing={3} style={{gap: 20, padding: 16}}>
            <CustomTextField required name={'firstName'} label='First name' />
            <CustomTextField required name={'lastName'} label='Last name' />
            <CustomTextField required name={'email'} label='E-mail' />
            <CustomTextField required name={'address'} label='Adress' />
            <CustomTextField required name={'city'} label='City' />
            <CustomTextField required name={'zip'} label='ZIP / Postal code' />

          <div style={{display: 'flex', width: '100%', gap:20}}>

          
          <Grid style={{padding: 0}} item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>


            <Select value={shippingCountry} fullWidth onChange={(e: any) => setShippingCountry(e.target.value) }>
              {countriesArr.map(country => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>

              ))}
              
           
            </Select>
          </Grid>

          <Grid style={{padding: 0}} item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select value={shippingSubdivision} fullWidth onChange={(e: any) => setShippingSubdivision(e.target.value) }>
              {subDivisionsArr.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>

              ))}
            </Select>
            
          
          </Grid>
          </div>

          <Grid style={{padding: 0}} item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>

            <Select value={shippingOptions[0]} fullWidth onChange={(e: any) => setShippingOption(e.target.value) }>
              {options.map((division: any) => (
                <MenuItem key={division.id} value={division.id}>
                  {division.label}
                </MenuItem>

              ))}
            </Select>

          </Grid>
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12 }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>

        </form>
      </FormProvider>
    </>
  )
}

