import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DeleteCourseConfirmationProps {
  courseId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeleteCourseConfirmation = ({ courseId, open, handleClose, onSuccess }: DeleteCourseConfirmationProps) => {
  const { deleteCourse } = useCourseApi()

  const handleConfirm = async () => {
    const { data, error } = await deleteCourse(courseId)

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Xóa khóa học'))
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
      title='Xác nhận xóa khóa học'
      description={APP_MESSAGE.CONFIRM_ACTION('xóa khóa học')}
      confirmButtonText='Xóa'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '444px' } }}
    />
  )
}

export default DeleteCourseConfirmation
