import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useCourseTemplateApi } from '~/hooks/api/useCourseTemplateApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DeleteCourseTemplateConfirmationProps {
  courseTemplateId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeleteCourseTemplateConfirmation = ({
  courseTemplateId,
  open,
  handleClose,
  onSuccess
}: DeleteCourseTemplateConfirmationProps) => {
  const { deleteCourseTemplate } = useCourseTemplateApi()

  const handleConfirm = async () => {
    const { data, error } = await deleteCourseTemplate(courseTemplateId)

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Xóa mẫu khóa học'))
      onSuccess()
    } else {
      notifyError(error.message)
    }
    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  return (
    <AlertDialog
      open={open}
      handleConfirm={handleConfirm}
      handleCancel={handleCancel}
      title='Xác nhận xóa mẫu khóa học'
      description={APP_MESSAGE.CONFIRM_ACTION('xóa mẫu khóa học')}
      confirmButtonText='Xóa'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '444px' } }}
    />
  )
}

export default DeleteCourseTemplateConfirmation
