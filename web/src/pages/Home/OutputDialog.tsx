import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  useTheme, useMediaQuery, Button
} from '@material-ui/core'

const OutputDialog: React.FC<{
  open: boolean
}> = ({ open, children }) => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Dialog
      fullScreen={fullscreen}
      open={open}
    >
      <DialogTitle>Predict Response</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OutputDialog
