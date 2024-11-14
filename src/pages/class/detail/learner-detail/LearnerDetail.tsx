import { Link, Navigate, useParams } from 'react-router-dom'
import Header from './components/Header'
import { useLearnerApi } from '~/hooks/api/useLearnerApi'
import { useEffect, useState } from 'react'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import Information from './components/Information'
import { Box, Button } from '@mui/material'

export default function LearnerDetail() {
  const [data, setData] = useState<LearnerDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { classId, learnerId } = useParams()
  const { getLearnerById } = useLearnerApi()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: session, error: apiError } = await getLearnerById(learnerId!)
      setData(session)
      setError(apiError)
    })()
  }, [getLearnerById, learnerId])

  if (error) {
    notifyError(error.message)
    return <Navigate to={protectedRoute.classDetail.path.replace(':id', classId!)} replace={true} />
  }

  return data ? (
    <>
      <Header classId={classId!} />
      <Information learner={data} />
      <Box display='flex' marginTop='1.25rem'>
        <Button sx={{ margin: 'auto' }} component={Link} to={'chat'}>
          Trao đổi
        </Button>
      </Box>
    </>
  ) : (
    <Loading />
  )
}
