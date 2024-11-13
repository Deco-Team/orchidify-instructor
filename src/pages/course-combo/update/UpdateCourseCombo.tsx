import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import Loading from '~/components/loading/Loading'
import { CourseComboDetailResponseDto } from '~/data/course-combo/courseCombo'
import { useCourseComboApi } from '~/hooks/api/useCourseComboApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import UpdateCourseComboForm from './components/UpdateCourseComboForm'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { CourseListItemResponseDto } from '~/data/course/course.dto'
import { CourseStatus } from '~/global/constants'

const UpdateCourseCombo = () => {
  const [comboDetail, setComboDetail] = useState<CourseComboDetailResponseDto | null>(null)
  const [courseList, setCourseList] = useState<CourseListItemResponseDto[]>([])
  const { getCourseComboById } = useCourseComboApi()
  const { getCourseList } = useCourseApi()

  const params = useParams()
  const navigate = useNavigate()

  const comboId = params.id

  useEffect(() => {
    if (comboId) {
      ;(async () => {
        const [{ data: comboDetail, error: comboDetailError }, { data: courseList, error: courseListError }] =
          await Promise.all([
            getCourseComboById(comboId),
            getCourseList(1, 1000, [], [{ field: 'status', value: CourseStatus.ACTIVE }])
          ])

        if (comboDetail) setComboDetail(comboDetail)
        if (courseList) setCourseList(courseList.docs)

        if (comboDetailError || courseListError) {
          notifyError(comboDetailError?.message || courseListError?.message || 'Unknown error')
          navigate(protectedRoute.courseComboDetail.path.replace(':id', comboId), { replace: true })
        }
      })()
    }
  }, [comboId, getCourseComboById, getCourseList, navigate])

  return comboDetail && courseList ? (
    <>
      <PageHeader
        title='Cập nhật Combo khóa học'
        breadcrumbsItems={[
          protectedRoute.courseComboList,
          { ...protectedRoute.courseComboDetail, path: protectedRoute.courseComboDetail.path.replace(':id', comboId!) },
          protectedRoute.updateCourseCombo
        ]}
      />
      <UpdateCourseComboForm comboDetail={comboDetail} courseList={courseList} />
    </>
  ) : (
    <Loading />
  )
}

export default UpdateCourseCombo
