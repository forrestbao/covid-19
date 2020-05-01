import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'

export type Unit = string | ([string, (value: number) => number] | [string])[]

const UnitDisplay: React.FC<{
  unit: Unit
}> = ({ unit }) => {
  let content: JSX.Element
  if (typeof unit === 'string') {
    content = <span dangerouslySetInnerHTML={{ __html: unit }}/>
  } else if (Array.isArray(unit)) {
    content = (
      <FormControl>
        <Select defaultValue={0}>
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
