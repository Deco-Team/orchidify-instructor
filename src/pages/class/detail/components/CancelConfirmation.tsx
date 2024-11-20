import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormDialog from '~/components/dialog/FormDialog'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  description: string
}

const defaultFormValues: FormValues = {
  description: ''
}

const validationSchema = z.object({
  description: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả yêu cầu'))
    .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả yêu cầu', 500))
})

interface SendCancelClassRequestProps {
  classId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const SendCancelClassRequestConfirmation = ({ classId, open, handleClose, onSuccess }: SendCancelClassRequestProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })
  const { createCancelClassRequest } = useRequestApi()

  const handleReject = async (data: FormValues) => {
    const { error } = await createCancelClassRequest({ classId, description: data.description })
    if (error) {
      notifyError(error.message)
    } else {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Gửi yêu cầu hủy lớp học'))
      onSuccess()
    }
    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  return (
    <FormDialog
      open={open}
      onSubmit={handleSubmit(handleReject)}
      handleCancel={handleCancel}
      isProcessing={isSubmitting}
      title='Xác nhận yêu cầu hủy lớp học'
      description={APP_MESSAGE.CONFIRM_ACTION('gửi yêu cầu lớp học này')}
      confirmButtonText='Gửi yêu cầu hủy'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      formContent={
        <ControlledOutlinedInput
          controller={{ name: 'description', control: control }}
          multiline
          minRows={7}
          maxRows={7}
          label='Mô tả yêu cầu'
          fullWidth
          sx={{ marginTop: '0.5rem' }}
        />
      }
      sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '100%' } }}
    />
  )
}

export default SendCancelClassRequestConfirmation
