import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'

export type Unit = string | ([string, (value: string) => number] | [string])[]

const UnitDisplay: React.FC<{
  unit: Unit
}> = ({ unit }) => {
  let content: JSX.Element
  if (typeof unit === 'string') {
    content = <span dangerouslySetInnerHTML={{ __html: unit }}/>
  } else if (Array.isArray(unit)) {
    content = (
      <FormControl>
        <Select>
          {unit.map((item, index) => (
            <MenuItem key={item[0]} value={index} dangerouslySetInnerHTML={{ __html: item[0] }}/>
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
