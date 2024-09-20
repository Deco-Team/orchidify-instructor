import { Box, Button, Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { CourseStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'
import CourseDeleteConfirmationModal from './CourseDeleteConfirmationModal'
import CourseDeleteRequestModal from './CourseDeleteRequestModal'
import { useState } from 'react'

const CourseDetailHeader = ({ deleteState, courseId }: { deleteState: CourseStatus; courseId: string }) => {
  const items = [protectedRoute.course, protectedRoute.courseDetail]
  const [openConfilmModal, setOpenConfilmModal] = useState(false)
  const [openRequestModal, setOpenRequestModal] = useState(false)
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
          Chi tiết khóa học
        </Typography>
        <Breadcrumbs items={items} />
      </Box>
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        <Button color='secondary'>Yêu cầu mở</Button>
        <Button color='warning'>Cập nhật</Button>
        {deleteState === CourseStatus.DRAFT || deleteState === CourseStatus.PENDING ? (
          <Button color='error' onClick={() => setOpenConfilmModal(true)}>
            Xóa
          </Button>
        ) : deleteState === CourseStatus.PUBLISHED || deleteState === CourseStatus.IN_PROGRESS ? (
          <Button color='error' onClick={() => setOpenRequestModal(true)}>
            Yêu cầu xóa
          </Button>
        ) : undefined}
      </Box>
      <CourseDeleteConfirmationModal
        courseId={courseId}
        handleClose={() => setOpenConfilmModal(false)}
        open={openConfilmModal}
      />
      <CourseDeleteRequestModal
        courseId={courseId}
        handleClose={() => setOpenRequestModal(false)}
        open={openRequestModal}
      />
    </Box>
  )
}

export default CourseDetailHeader
