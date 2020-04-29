import React, { useCallback } from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core'
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    minWidth: 120
  },
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  }
}))

const HomePageConsumer: React.FC = () => {
  const classes = useStyles()
  const formStore = useFormStore()
  const setField = useCallback((index: number, value: number) => {
    formStore.form[index] = value
  }, [formStore.form])
  const enter = useCallback(() => {
    // todo
  }, [formStore.form, formStore.type])
  return useObserver(() => (
    <Container maxWidth='md'>
      <CssBaseline/>
      <FormControl className={classes.formControl} style={{ marginTop: '1rem' }}>
        <InputLabel>Type</InputLabel>
        <Select onChange={(event) => {
          formStore.type = Number(event.target.value as number)
        }}>
          <MenuItem value={0}>Mild vs Viral</MenuItem>
          <MenuItem value={1}>Severe vs Viral</MenuItem>
          <MenuItem value={2}>Mild vs Severe</MenuItem>
        </Select>
        <NumberInput className={classes.inputField} label='White blood cell' field={0} callback={setField}/>
        <NumberInput className={classes.inputField} label='Hemoglobin' field={1} callback={setField}/>
        <NumberInput className={classes.inputField} label='Platelet' field={2} callback={setField}/>
        <NumberInput className={classes.inputField} label='Neutrophil count' field={3} callback={setField}/>
        <NumberInput className={classes.inputField} label='Lymphocyte percent' field={4} callback={setField}/>
        <NumberInput className={classes.inputField} label='Lymphocyte count' field={5} callback={setField}/>
        <NumberInput className={classes.inputField} label='ESR' field={6} callback={setField}/>
        <NumberInput className={classes.inputField} label='C-Reaction protein' field={7} callback={setField}/>
        <NumberInput className={classes.inputField} label='Blood urea nitrogen (BUN)' field={8} callback={setField}/>
        <NumberInput className={classes.inputField} label='Creatinine' field={9} callback={setField}/>
        <NumberInput className={classes.inputField} label='Lactate dehydrogenase (LDN)' field={10} callback={setField}/>
        <NumberInput className={classes.inputField} label='D-dimer' field={11} callback={setField}/>
      </FormControl>
      <Button onClick={enter} variant='contained' color='primary'>Enter</Button>
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
