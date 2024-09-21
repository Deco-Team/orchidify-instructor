import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface CourseDeleteConfirmationProps {
  open: boolean
  handleClose: () => void
  courseId: string
}

const CourseDeleteConfirmationModal = (props: CourseDeleteConfirmationProps) => {
  const { handleClose, open, courseId } = props
  const { deleteCourseById } = useCourseApi()

  const handleConfirm = async () => {
    const { data, error } = await deleteCourseById(courseId)

    if (data) notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Xóa khóa học'))
    else notifyError(error.message)

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

export default CourseDeleteConfirmationModal
