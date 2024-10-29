import { forwardRef, ReactElement, Ref } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Grid, Slide } from '@mui/material'
import { APP_MESSAGE } from '~/global/app-message'
// import { notifyError, notifySuccess } from '~/utils/toastify'
import { TransitionProps } from '@mui/material/transitions'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface GradeAssignmentDialogProps {
  submissionId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const defaultFormValues: { point: number; feedback: string } = {
  point: 0,
  feedback: ''
}

const gradeAssignmentSchema = z.object({
  point: z.coerce
    .number({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .int({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
    .min(1, APP_MESSAGE.VALUE_OUT_OF_RANGE(1, 10))
    .max(10, APP_MESSAGE.VALUE_OUT_OF_RANGE(1, 10)),
  feedback: z
    .string()
    .trim()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Nhận xét'))
    .max(500, APP_MESSAGE.FIELD_TOO_LONG('Nhận xét', 500))
})

const GradeAssignmentDialog = ({ submissionId, open, handleClose, onSuccess }: GradeAssignmentDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<{ point: number; feedback: string }>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(gradeAssignmentSchema)
  })

  const handleConfirm = handleSubmit(async (formData) => {
    console.log(submissionId, formData)

    onSuccess()
    handleClose()
  })

  const handleCancel = () => {
    handleClose()
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby='alert-dialog-slide-description'
      maxWidth='md'
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleConfirm
      }}
    >
      <DialogContent>
        <Grid container columnSpacing={4} rowSpacing={'20px'}>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'point', control: control }}
              label='Điểm số'
              placeholder='Nhập điểm số'
              inputMode='numeric'
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'feedback', control: control }}
              label='Nhận xét'
              placeholder='Nhập nhận xét'
              multiline
              minRows={6}
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem' }}>
        <Button color={'primary'} onClick={handleConfirm} disabled={isSubmitting || Object.keys(errors).length > 0}>
          Xác nhận
        </Button>
        <Button variant='outlined' color='info' onClick={handleCancel} disabled={isSubmitting}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GradeAssignmentDialog
