import useAuth from '~/auth/useAuth'
import AlertDialog from '../dialog/AlertDialog'
import { notifySuccess } from '~/utils/toastify'
import { APP_MESSAGE } from '~/global/app-message'

interface LogoutConfirmationProps {
  open: boolean
  handleClose: () => void
}

const LogoutConfirmation = ({ open, handleClose }: LogoutConfirmationProps) => {
  const { logout } = useAuth()

  const handleConfirm = () => {
    logout()
    notifySuccess('Đăng xuất thành công')
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
      title='Xác nhận đăng xuất'
      description={APP_MESSAGE.CONFIRM_ACTION('đăng xuất')}
      confirmButtonText='Đăng xuất'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '444px' } }}
    />
  )
}

export default LogoutConfirmation
