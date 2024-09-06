import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface LogoutConfirmationProps {
  open: boolean
  handleClose: () => void
  logout: () => void
}

const LogoutConfirmation = ({ open, handleClose, logout }: LogoutConfirmationProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={'xs'}
      fullWidth
    >
      <DialogTitle id='alert-dialog-title'>{'Xác nhận đăng xuất'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description' color={'black'}>
          Bạn có muốn đăng xuất khỏi thiết bị này?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={logout} variant='contained' color='error'>
          Đăng xuất
        </Button>
        <Button
          onClick={handleClose}
          variant='outlined'
          sx={{
            borderColor: '#AEAEB2',
            color: '#AEAEB2',
            '&:hover': {
              borderColor: '#AEAEB2'
            }
          }}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutConfirmation
