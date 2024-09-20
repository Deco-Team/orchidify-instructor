import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'

type FormValues = {
  description: string
}

const defaultFormValues: FormValues = {
  description: ''
}

const validationSchema = z.object({
  description: z.string().max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả', 500))
})

interface ICourseDeleteRequestModal {
  open: boolean
  handleClose: () => void
  courseId: string
}

const CourseDeleteRequestModal = (props: ICourseDeleteRequestModal) => {
  const {
    //handleSubmit,
    control
    //formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const { handleClose, open } = props //TODO: add courseId

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Xác nhận yêu cầu xóa khóa học</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn muốn gửi yêu cầu xóa khóa học này? </DialogContentText>
        <ControlledOutlinedInput
          rows={6}
          multiline
          sx={{ my: 2 }}
          fullWidth
          required
          controller={{ name: 'description', control: control }}
          label='Mô tả yêu cầu'
        />
      </DialogContent>
      <DialogActions>
        <Button color='error'>Gửi yêu cầu xóa</Button>
        <Button onClick={handleClose} variant='outlined' color='info'>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CourseDeleteRequestModal
