import React, { useCallback } from 'react'
import { TextField } from '@material-ui/core'

const NumberInput: React.FC<{
  label: string
  field: number
  onChange: (index: number, value: number) => void
}> = ({ label, field, onChange: callback }) => {
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    useCallback((target) => {
      callback(field, Number(target.target.value))
    }, [field, callback])
  return (
    <form>
      <TextField onChange={onChange} label={label} type='number'/>
    </form>
  )
}

export default NumberInput
