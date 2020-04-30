import React, { useCallback } from 'react'
import { Input, InputProps, FormControl, InputLabel } from '@material-ui/core'

const NumberInput: React.FC<InputProps & {
  label: string
  field: number
  callback: (index: number, value: number) => void
}> = ({ label, field, callback, ...props }) => {
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    useCallback((target) => {
      callback(field, Number(target.target.value))
    }, [field, callback])
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Input onChange={onChange} type='number' {...props}/>
    </FormControl>
  )
}

export default NumberInput
