import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { notifyError } from '~/utils/toastify'

interface ICourseDeleteConfirmationModal {
  open: boolean
  handleClose: () => void
  courseId: string
}

const CourseDeleteConfirmationModal = (props: ICourseDeleteConfirmationModal) => {
  const { handleClose, open, courseId } = props
  const { deleteCourseById } = useCourseApi()
  const navigate = useNavigate()

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Xác nhận xóa khóa học</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có chắc chắn xóa khóa học này không?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='error'
          onClick={async () => {
            const { data, error } = await deleteCourseById(courseId)
            if (data?.success) navigate('/courses')
            else if (error) {
              notifyError(error?.message)
            }
          }}
        >
          Xóa
        </Button>
        <Button onClick={handleClose} variant='outlined' color='info'>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CourseDeleteConfirmationModal
