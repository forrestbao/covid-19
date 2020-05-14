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
import UnitDisplay from '../components/UnitDisplay'
import OutputDialog from './Home/OutputDialog'
import { getSVMPredict } from '../api'
import { formData } from '../data'

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

const HomePage: React.FC = () => {
  const classes = useStyles()
  const formStore = useLocalStore(() => ({
    form: new Array(15) as number[],
    type: 0,
    data: [...formData]
  }))
  const homeStore = useLocalStore(() => ({
    openDialog: false,
    dialogData: {
      text: ''
    },
    showMessage: (text: string) => {
      homeStore.openDialog = true
      homeStore.dialogData.text = text
    }
  }))
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
        homeStore.showMessage('COVID-19 likely')
      } else {
        homeStore.showMessage('non-COVID-19 likely')
      }
    })
  }, [formStore.form, formStore.data, showError, isSnackbarOpen, homeStore])
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
        </Select>
        {formStore.data.map((item, index) => {
          if (item.type === 'base') {
            return (
              <NumberInput
                className={classes.inputField}
                error={item.error}
                label={item.name}
                endAdornment={<InputAdornment position='end'><UnitDisplay unit={item.unit}/></InputAdornment>}
                field={index}
                key={index}
                callback={setField}
              />
            )
          } else if (item.type === 'gender') {
            return (
              <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select
                  className={classes.inputField}
                  onChange={(target) => setField(index, Number(target.target.value))}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={0}>Female</MenuItem>
                </Select>
              </FormControl>
            )
          } else {
            return null
          }
        })}
      </FormControl>
      <Button onClick={enter} variant='contained' color='primary' endIcon={<Send/>}>predict</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => { setSnackbarOpen(false) }}
      >
        <MuiAlert elevation={6} variant='filled' severity='error'>{snackbarMessage}</MuiAlert>
      </Snackbar>
      <OutputDialog
        open={homeStore.openDialog}
        text={homeStore.dialogData.text}
        onClose={() => { homeStore.openDialog = false }}
      />
    </Container>
  ))
}

export default HomePage
