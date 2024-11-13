import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useCourseComboApi } from '~/hooks/api/useCourseComboApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DeleteCourseComboConfirmationProps {
  comboId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeleteCourseComboConfirmation = ({
  comboId,
  open,
  handleClose,
  onSuccess
}: DeleteCourseComboConfirmationProps) => {
  const { deleteCourseCombo } = useCourseComboApi()

  const handleConfirm = async () => {
    const { data, error } = await deleteCourseCombo(comboId)

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Xóa Combo khóa học'))
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
      title='Xác nhận xóa Combo khóa học'
      description={APP_MESSAGE.CONFIRM_ACTION('xóa Combo khóa học')}
      confirmButtonText='Xóa'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '444px' } }}
    />
  )
}

export default DeleteCourseComboConfirmation
