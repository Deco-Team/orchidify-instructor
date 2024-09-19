import { Box, Button, Modal, Typography } from '@mui/material'

interface ICourseDeleteConfirmationModal {
  open: boolean
  handleClose: () => void
}

const CourseDeleteConfirmationModal = (props: ICourseDeleteConfirmationModal) => {
  const { handleClose, open } = props
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
          Xác nhận xóa khóa học
        </Typography>
        <Typography sx={{ mt: 1 }}>Bạn có chắc chắn xóa khóa học này không?</Typography>
        <Box sx={{ display: 'flex', gap: 1, my: 2, alignSelf: 'flex-end' }}>
          <Button color='error'>Xóa</Button>
          <Button onClick={handleClose} variant='outlined' color='info'>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CourseDeleteConfirmationModal
