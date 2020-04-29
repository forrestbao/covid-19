import React from 'react'
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/Home'

const fixedURL = (url: string) => `${process.env.PUBLIC_URL}${url}`

function App () {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            COVID-19
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route path={fixedURL('/')} exact>
            <HomePage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
