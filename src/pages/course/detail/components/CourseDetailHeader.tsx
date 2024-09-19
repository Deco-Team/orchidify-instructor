import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'
import CourseDeleteConfirmationModal from './CourseDeleteConfirmationModal'
import CourseDeleteRequestModal from './CourseDeleteRequestModal'
const CourseDetailHeader = () => {
  const items = [protectedRoute.course, protectedRoute.courseDetail]
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openRequest, setOpenRequest] = useState(false)
  const [deleteState, setdeleteState] = useState<'confirmation' | 'request'>('confirmation')
  const handleOpen = (isConfirmation = false) => (isConfirmation ? setOpenConfirmation(true) : setOpenRequest(true))
  const handleClose = (isConfirmation = false) => (isConfirmation ? setOpenConfirmation(false) : setOpenRequest(false))

  //TODO: Change open request button

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết khóa học
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        <Button
          onClick={() => (deleteState === 'confirmation' ? setdeleteState('request') : setdeleteState('confirmation'))}
          color='secondary'
        >
          Yêu cầu mở
        </Button>
        <Button color='warning'>Cập nhật</Button>
        <Button onClick={() => (deleteState === 'confirmation' ? handleOpen(true) : handleOpen())} color='error'>
          {deleteState === 'confirmation' ? 'Xóa' : 'Yêu cầu xóa'}
        </Button>
      </Box>
      <CourseDeleteConfirmationModal handleClose={() => handleClose(true)} open={openConfirmation} />
      <CourseDeleteRequestModal handleClose={() => handleClose()} open={openRequest} />
    </Box>
  )
}

export default CourseDetailHeader
