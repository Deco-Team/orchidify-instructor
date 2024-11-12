import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface CancelRequestConfirmationProps {
  requestId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const CancelRequestConfirmation = ({ requestId, open, handleClose, onSuccess }: CancelRequestConfirmationProps) => {
  const { cancelPayoutRequest } = useRequestApi()

  const handleConfirm = async () => {
    const { data, error } = await cancelPayoutRequest(requestId)

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Hủy yêu cầu rút tiền'))
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
      title='Xác nhận hủy yêu cầu'
      description={APP_MESSAGE.CONFIRM_ACTION('hủy yêu cầu rút tiền')}
      confirmButtonText='Hủy'
      confirmButtonColor='error'
      cancelButtonText='Thoát'
      sx={{ '& .MuiDialog-paper': { width: '444px' } }}
    />
  )
}

export default CancelRequestConfirmation
