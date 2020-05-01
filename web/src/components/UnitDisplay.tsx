import React, { useCallback } from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'

const noop = () => {}

export type Unit = string | ([string, (value: number) => number] | [string])[]

const UnitDisplay: React.FC<{
  unit: Unit
  onChange?: (render: (value: number) => number) => void
}> = ({ unit, onChange = noop }) => {
  const callback = useCallback((event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const selected = Number(event.target.value)
    if (Array.isArray(unit) && unit[selected].length === 2 && typeof unit[selected][1] === 'function') {
      onChange(unit[selected][1] as (v: number) => number)
    } else {
      onChange(v => v)
    }
  }, [unit, onChange])
  let content: JSX.Element
  if (typeof unit === 'string') {
    content = <span dangerouslySetInnerHTML={{ __html: unit }}/>
  } else if (Array.isArray(unit)) {
    content = (
      <FormControl>
        <Select onChange={callback} defaultValue={0}>
          {unit.map((item, index) => (
            <MenuItem key={item[0]} value={index}>
              {item[0]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  } else {
    return (<div></div>)
  }
  return content
}

export default UnitDisplay
