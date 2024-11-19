import { Box } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'
import CreateCourseComboForm from './components/CreateCourseComboForm'
import { useEffect, useState } from 'react'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { CourseListItemResponseDto } from '~/data/course/course.dto'
import { CourseStatus } from '~/global/constants'
import Loading from '~/components/loading/Loading'
import { notifyError } from '~/utils/toastify'
import { useNavigate } from 'react-router-dom'

const CreateCourseCombo = () => {
  const navigate = useNavigate()
  const { getCourseList } = useCourseApi()
  const [data, setData] = useState<CourseListItemResponseDto[]>([])

  useEffect(() => {
    ;(async () => {
      const { data: courseList, error: apiError } = await getCourseList(
        1,
        1000,
        [],
        [{ field: 'status', value: CourseStatus.ACTIVE }]
      )

      if (courseList) {
        setData(courseList.docs)
      }

      if (apiError) {
        notifyError(apiError.message)
        navigate(-1)
      }
    })()
  }, [getCourseList, navigate])

  return data ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <PageHeader
        title='Tạo combo khóa học'
        breadcrumbsItems={[protectedRoute.courseComboList, protectedRoute.createCourseCombo]}
      />
      <CreateCourseComboForm courses={data} />
    </Box>
  ) : (
    <Loading />
  )
}

export default CreateCourseCombo
