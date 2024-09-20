/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Modal, Typography } from '@mui/material'
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
}

const CourseDeleteRequestModal = (props: ICourseDeleteRequestModal) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const { handleClose, open } = props
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    py: 2,
    px: 3,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column'
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h6' component='h2'>
          Xác nhận yêu cầu xóa khóa học
        </Typography>
        <Typography sx={{ mt: 2 }}>Bạn muốn gửi yêu cầu xóa khóa học này?</Typography>
        <ControlledOutlinedInput
          rows={6}
          multiline
          sx={{ my: 2 }}
          fullWidth
          required
          controller={{ name: 'description', control: control }}
          label='Mô tả yêu cầu'
        />
        <Box sx={{ display: 'flex', gap: 1, my: 2, alignSelf: 'flex-end' }}>
          <Button color='error'>Gửi yêu cầu xóa</Button>
          <Button onClick={handleClose} variant='outlined' color='info'>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CourseDeleteRequestModal
