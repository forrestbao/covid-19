import React from 'react'
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core'

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
      <Container maxWidth='xs'>
        <CssBaseline/>
      </Container>
    </div>
  )
}

export default App
