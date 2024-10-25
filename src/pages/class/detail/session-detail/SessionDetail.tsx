import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { ErrorResponseDto } from '~/data/error.dto'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import SessionDetailHeader from './components/SessionDetailHeader'
import SessionDetailInformation from './components/SessionDetailInformation'
import AssignmentDetailInformation from './components/AssignmentDetailInformation'
import { useClassApi } from '~/hooks/api/useClassApi'
import { SessionDto } from '~/data/course/course.dto'

const SessionDetail = () => {
  const [data, setData] = useState<SessionDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const classId = params.classId
  const sessionId = params.sessionId
  const { getSessionById } = useClassApi()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: session, error: apiError } = await getSessionById(classId!, sessionId!)
      setData(session)
      setError(apiError)
    })()
  }, [getSessionById, classId, sessionId])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.classDetail.path.replace(':id', classId!), { replace: true })
  }

  return data ? (
    <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
      <SessionDetailHeader id={classId!} />
      <SessionDetailInformation session={data} />
      {/*
        Only allow 1 assignment per session 
      */}
      {data.assignments.length > 0 ? <AssignmentDetailInformation assignment={data.assignments[0]} /> : null}
    </Box>
  ) : (
    <Loading />
  )
}

export default SessionDetail
