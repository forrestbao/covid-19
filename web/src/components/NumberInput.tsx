import React, { useCallback } from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'

const NumberInput: React.FC<TextFieldProps & {
  label: string
  field: number
  callback: (index: number, value: number) => void
}> = ({ label, field, callback, ...props }) => {
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    useCallback((target) => {
      callback(field, Number(target.target.value))
    }, [field, callback])
  return (
    <TextField onChange={onChange} label={label} type='number' {...props}/>
  )
}

export default NumberInput
