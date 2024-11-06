import { Box, Divider, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import Loading from '~/components/loading/Loading'
import { SessionDto } from '~/data/course/course.dto'
import { useClassApi } from '~/hooks/api/useClassApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import UploadResourcesForm from './UploadResourcesForm'

const UploadResources = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId
  const navigate = useNavigate()

  const [data, setData] = useState<SessionDto | null>(null)

  const { getSessionById } = useClassApi()

  const breadcrumbsItems = [
    protectedRoute.classList,
    {
      ...protectedRoute.classDetail,
      path: protectedRoute.classDetail.path.replace(':id', classId!)
    },
    {
      ...protectedRoute.classSessionDetail,
      path: protectedRoute.classSessionDetail.path.replace(':classId', classId!).replace(':sessionId', sessionId!)
    },
    protectedRoute.uploadResources
  ]

  useEffect(() => {
    ;(async () => {
      const { data: session, error: apiError } = await getSessionById(classId!, sessionId!)

      setData(session)

      if (apiError) {
        notifyError(apiError.message)
        navigate(-1)
      }
    })()
  }, [getSessionById, classId, sessionId, navigate])

  return data ? (
    <>
      <PageHeader title='Tải lên tài nguyên' breadcrumbsItems={breadcrumbsItems} />
      <Paper elevation={2} sx={{ width: '100%', padding: 3, marginTop: 2.5 }}>
        <Box display='flex' alignItems='center' marginBottom='1.25rem' gap={1}>
          <Typography variant='h5' fontWeight={'bold'}>
            Tài nguyên bài học
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <UploadResourcesForm data={data} classId={classId!} sessionId={sessionId!} />
      </Paper>
    </>
  ) : (
    <Loading />
  )
}

export default UploadResources
