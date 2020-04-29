import React, { useCallback } from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NumberInput from '../components/NumberInput'

const createStore = () => ({
  form: new Array(12) as number[],
  type: 0
})

const formStoreContext = React.createContext <ReturnType<typeof createStore> | null>(null)

const useFormStore = () => {
  const store = React.useContext(formStoreContext)
  if (!store) {
    throw new Error('useFormStore must be used within a StoreProvider')
  }
  return store
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const HomePageConsumer: React.FC = () => {
  const classes = useStyles()
  const formStore = useFormStore()
  const setField = useCallback((index: number, value: number) => {
    formStore.form[index] = value
  }, [formStore.form])
  return useObserver(() => (
    <Container maxWidth='xs'>
      <CssBaseline/>
      <FormControl className={classes.formControl} style={{ marginTop: '1rem' }}>
        <InputLabel>Type</InputLabel>
        <Select>
          <MenuItem value={0}>Mild vs Viral</MenuItem>
          <MenuItem value={1}>Severe vs Viral</MenuItem>
          <MenuItem value={2}>Mild vs Severe</MenuItem>
        </Select>
        <NumberInput label='White blood cell' field={0} onChange={setField}/>
        <NumberInput label='Hemoglobin' field={1} onChange={setField}/>
        <NumberInput label='Platelet' field={2} onChange={setField}/>
        <NumberInput label='Neutrophil count' field={3} onChange={setField}/>
        <NumberInput label='Lymphocyte percent' field={4} onChange={setField}/>
        <NumberInput label='Lymphocyte count' field={5} onChange={setField}/>
        <NumberInput label='ESR' field={6} onChange={setField}/>
        <NumberInput label='C-Reaction protein' field={7} onChange={setField}/>
        <NumberInput label='Blood urea nitrogen (BUN)' field={8} onChange={setField}/>
        <NumberInput label='Creatinine' field={9} onChange={setField}/>
        <NumberInput label='Lactate dehydrogenase(LDN)' field={10} onChange={setField}/>
        <NumberInput label='D-dimer' field={11} onChange={setField}/>
      </FormControl>
    </Container>
  ))
}

const HomePage: React.FC = () => {
  const formStore = useLocalStore(createStore)
  return (
    <formStoreContext.Provider value={formStore}>
      <HomePageConsumer/>
    </formStoreContext.Provider>
  )
}

export default HomePage
