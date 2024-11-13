import Box from '@mui/material/Box/Box'
import CourseDetailHeader from './components/CourseDetailHeader'
import CourseDetailInformation from './components/CourseDetailInformation'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { useNavigate, useParams } from 'react-router-dom'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { protectedRoute } from '~/routes/routes'
import CourseDetailResourceAndFeedback from './components/resource-and-feedback/CourseDetailResourceAndFeedback'
import { CourseDetailResponseDto } from '~/data/course/course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import DeleteCourseConfirmation from './components/DeleteCourseConfirmation'

export default function CourseDetail() {
  const [data, setData] = useState<CourseDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.id
  const { getCourseById } = useCourseApi()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: course, error: apiError } = await getCourseById(courseId!)
      setData(course)
      setError(apiError)
    })()
  }, [courseId, getCourseById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.courseList.path, { replace: true })
  }

  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true)
  }

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false)
  }

  const handleDeleteSuccess = () => {
    navigate(protectedRoute.courseList.path, { replace: true })
  }

  return data ? (
    <>
      <Box sx={{ marginBottom: '40px' }}>
        <CourseDetailHeader
          courseStatus={data.status}
          onDeleteButtonClick={handleOpenDeleteConfirmation}
          courseId={data._id}
          isRequesting={data.isRequesting}
        />
        <CourseDetailInformation course={data} />
        <CourseDetailResourceAndFeedback course={data} />
      </Box>
      <DeleteCourseConfirmation
        courseId={data._id}
        open={openDeleteConfirmation}
        handleClose={handleCloseDeleteConfirmation}
        onSuccess={handleDeleteSuccess}
      />
    </>
  ) : (
    <Loading />
  )
}
