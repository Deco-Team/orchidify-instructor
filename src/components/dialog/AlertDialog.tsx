import { forwardRef, ReactElement, Ref } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  ButtonProps,
  DialogProps
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface AlertDialogProps {
  title: string
  description: string
  open: boolean
  handleConfirm: () => void
  handleCancel: () => void
  confirmButtonText?: string
  confirmButtonColor?: ButtonProps['color']
  cancelButtonText?: string
}

const AlertDialog = ({
  title,
  description,
  open,
  handleConfirm,
  handleCancel,
  confirmButtonText = 'Confirm',
  confirmButtonColor = 'primary',
  cancelButtonText = 'Cancel',
  sx
}: AlertDialogProps & Pick<DialogProps, 'sx'>) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby='alert-dialog-slide-description'
      sx={sx}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem' }}>
        <Button color={confirmButtonColor} onClick={handleConfirm}>
          {confirmButtonText}
        </Button>
        <Button variant='outlined' color='info' onClick={handleCancel}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
