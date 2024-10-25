import Header from './components/Header'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { useNavigate, useParams } from 'react-router-dom'
import { useClassApi } from '~/hooks/api/useClassApi'
import Loading from '~/components/loading/Loading'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import ClassInformation from './components/ClassInformation'
import CourseInformation from './components/CourseInformation'
import SessionLearnerFeedbackList from './components/SessionLearnerFeedbackList'
import { ClassDetailResponseDto } from '~/data/class/class.dto'

export default function ViewClassDetail() {
  const [classDetail, setClassRDetail] = useState<ClassDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { getClassById } = useClassApi()
  const params = useParams()
  const navigate = useNavigate()

  const classId = params.id

  useEffect(() => {
    if (classId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: classDetail, error: apiError } = await getClassById(classId)
        setClassRDetail(classDetail)
        setError(apiError)
      })()
    }
  }, [classId, getClassById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.classList.path, { replace: true })
  }

  return classDetail ? (
    <>
      <Header showCancelRequestButton={classDetail.learners.length === 0} onCancelRequestButtonClick={() => {}} />
      <ClassInformation classDetail={classDetail} />
      <CourseInformation classDetail={classDetail} />
      <SessionLearnerFeedbackList
        classId={classDetail._id}
        sessions={classDetail.sessions}
        learners={classDetail.learners}
      />
    </>
  ) : (
    <Loading />
  )
}
