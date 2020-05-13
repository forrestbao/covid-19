import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  useTheme, useMediaQuery, Button
} from '@material-ui/core'

const OutputDialog: React.FC<{
  open: boolean,
  text: string,
  onClose: () => void
}> = ({ open, text, onClose }) => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Dialog
      fullScreen={fullscreen}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Predict result</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OutputDialog
