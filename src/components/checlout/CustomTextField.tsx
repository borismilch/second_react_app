import React from 'react'
import { CustomFormProps } from '../../types/interfaces'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
export const CustomTextField: React.FC<CustomFormProps> = ({ name, label, required }) => {
  const { control } = useFormContext()
  return (
    <Grid style={{maxWidth: '50%', flexGrow: 1 }}>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
       />
    </Grid>
  )
}
