import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formStore = useFormStore()
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
