import { FormEvent, forwardRef, ReactElement, ReactNode, Ref } from 'react'
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

interface FormDialogProps {
  title: string
  description: string
  open: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  isProcessing?: boolean
  confirmButtonText?: string
  confirmButtonColor?: ButtonProps['color']
  cancelButtonText?: string
  formContent: ReactNode
}

const FormDialog = ({
  title,
  description,
  open,
  onSubmit,
  handleCancel,
  isProcessing = false,
  confirmButtonText = 'Confirm',
  confirmButtonColor = 'primary',
  cancelButtonText = 'Cancel',
  formContent,
  sx
}: FormDialogProps & Pick<DialogProps, 'sx'>) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: onSubmit
      }}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby='alert-dialog-slide-description'
      sx={sx}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{description}</DialogContentText>
        {formContent}
      </DialogContent>
      <DialogActions sx={{ padding: '1rem' }}>
        <Button type='submit' disabled={isProcessing} color={confirmButtonColor}>
          {confirmButtonText}
        </Button>
        <Button disabled={isProcessing} variant='outlined' color='info' onClick={handleCancel}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
