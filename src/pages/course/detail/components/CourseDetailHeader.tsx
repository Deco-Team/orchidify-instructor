import { Box, Button, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { CourseStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'
import CourseDeleteConfirmation from './CourseDeleteConfirmationModal'
import { useState } from 'react'

interface CourseDetailHeaderProps {
  courseId: string
  courseStatus: CourseStatus
  handleDeleteSuccess: () => void
}

const CourseDetailHeader = ({ courseId, courseStatus, handleDeleteSuccess }: CourseDetailHeaderProps) => {
  const items = [protectedRoute.course, protectedRoute.courseDetail]
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false)
    handleDeleteSuccess()
  }

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết khóa học
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {courseStatus === CourseStatus.DRAFT ? <Button color='secondary'>YÊU CẦU MỞ</Button> : undefined}
        {courseStatus === CourseStatus.DRAFT ? (
          <Button color='warning'>Cập nhật</Button>
        ) : courseStatus === CourseStatus.PUBLISHED ? (
          <Button color='warning'>Yêu cầu cập nhật</Button>
        ) : undefined}
        {courseStatus === CourseStatus.DRAFT ? (
          <Button color='error' onClick={() => setOpenDeleteConfirmation(true)}>
            Xóa
          </Button>
        ) : courseStatus === CourseStatus.PUBLISHED ? (
          <Button color='error'>Yêu cầu xóa</Button>
        ) : undefined}
      </Box>
      <CourseDeleteConfirmation
        courseId={courseId}
        handleClose={handleCloseDeleteConfirmation}
        open={openDeleteConfirmation}
      />
    </Box>
  )
}

export default CourseDetailHeader
