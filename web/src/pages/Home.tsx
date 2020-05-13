import React, { useCallback, useState } from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import {
  Container, CssBaseline, FormControl, InputLabel, MenuItem,
  Select, Button, Snackbar, InputAdornment
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Send } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import NumberInput from '../components/NumberInput'
import UnitDisplay, { Unit } from '../components/UnitDisplay'
import OutputDialog from './Home/OutputDialog'
import { getSVMPredict } from '../api'

type FeatureBase = {
  name: string
}

interface Feature extends FeatureBase {
  type: 'base'
}

interface Gender extends FeatureBase {
  type: 'gender'
}

type FeatureInput = ((Feature & { unit: Unit }) | Gender) & {
  error: boolean
}

const formData: FeatureInput[] = [
  { type: 'base', name: 'Count of White blood cell (WBC)', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'Hemoglobin (HGB)', error: false, unit: 'g/L' },
  { type: 'base', name: 'Platelet', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'Neutrophil percent', error: false, unit: '%' },
  { type: 'base', name: 'Neutrophil count', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'Lymphocyte percent', error: false, unit: '%' },
  { type: 'base', name: 'Lymphocyte count', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'C-reaction protein (CRP)', error: false, unit: 'mg/L' },
  {
    type: 'base',
    name: 'Total bilirubin (TBL)',
    error: false,
    unit: [['umol/L', value => (value / 17.1036)], ['mg/dL']]
  },
  {
    type: 'base',
    name: 'Blood urea nitrogen (BUN)',
    error: false,
    unit: [['mmol/L', value => (value / 0.3571)], ['mg/dL']]
  },
  { type: 'base', name: 'Creatinine', error: false, unit: [['umol/L', value => (value / 88.417)], ['mg/dL']] },
  { type: 'base', name: 'Lactate dehydrogenase (LDH)', error: false, unit: 'U/L' },
  { type: 'base', name: 'D-dimer', error: false, unit: 'mg/L' },
  { type: 'gender', name: 'Gender', error: false }
]

const createStore = () => ({
  form: new Array(14) as number[],
  type: 0,
  data: [...formData]
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
    margin: theme.spacing(1)
  },
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '35ch',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))

const HomePageConsumer: React.FC = () => {
  const classes = useStyles()
  const formStore = useFormStore()
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const setField = useCallback((index: number, value: number) => {
    formStore.form[index] = value
    formStore.data[index].error = false
  }, [formStore.form, formStore.data])
  const showError = useCallback((errorMessage: string) => {
    setSnackbarOpen(true)
    setSnackbarMessage(errorMessage)
  }, [])
  const enter = useCallback(() => {
    formStore.form.forEach((item, index) => {
      if (item == null) {
        !isSnackbarOpen && showError(`'${formData[index].name}' is empty`)
        formStore.data[index].error = true
      }
    })
    if (formStore.data.some(item => item.error)) {
      return
    }
    getSVMPredict([...formStore.form]).then(res => {
      if (res === -1) {

      } else if (res === 1) {

      }
    })
  }, [formStore.form, formStore.data, showError, isSnackbarOpen])
  return useObserver(() => (
    <Container maxWidth='md'>
      <CssBaseline/>
      <FormControl className={classes.formControl} style={{ marginTop: '1rem' }}>
        <InputLabel>Type</InputLabel>
        <Select
          className={classes.inputField}
          defaultValue={0}
          onChange={(event) => {
            formStore.type = Number(event.target.value as number)
          }}
        >
          <MenuItem value={0}>Mild vs Viral</MenuItem>
          <MenuItem value={1}>Severe vs Viral</MenuItem>
          <MenuItem value={2}>Mild vs Severe</MenuItem>
        </Select>
        {formStore.data.map((item, index) => {
          if (item.type === 'base') {
            return (<NumberInput
              className={classes.inputField}
              error={item.error}
              label={item.name}
              endAdornment={<InputAdornment position='end'><UnitDisplay unit={item.unit}/></InputAdornment>}
              field={index}
              key={index}
              callback={setField}/>)
          } else if (item.type === 'gender') {
            return (
              <Select value={formStore.form[index]}>
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            )
          }
        })}
      </FormControl>
      <Button onClick={enter} variant='contained' color='primary' endIcon={<Send/>}>Enter</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => { setSnackbarOpen(false) }}
      >
        <MuiAlert elevation={6} variant='filled' severity='error'>{snackbarMessage}</MuiAlert>
      </Snackbar>
      <OutputDialog open={false}/>
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
