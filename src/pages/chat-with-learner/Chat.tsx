import { Box } from '@mui/material'
import { signInWithCustomToken } from 'firebase/auth'
import { useEffect, useState } from 'react'
import ChatBox from '~/components/chat-with-learner/ChatBox'
import PageHeader from '~/components/header/PageHeader'
import useAuthFirebaseApi from '~/hooks/api/useAuthFirebaseApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { auth } from '~/utils/chat-firebase/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { APP_MESSAGE } from '~/global/app-message'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '~/components/loading/Loading'
import { useLearnerApi } from '~/hooks/api/useLearnerApi'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'

const Chat = () => {
  const { createCustomToken } = useAuthFirebaseApi()
  const navigate = useNavigate()
  const params = useParams()
  const classId = params.classId
  const learnerId = params.learnerId
  const [user] = useAuthState(auth)

  const { getLearnerById } = useLearnerApi()
  const [learnerData, setLearnerData] = useState<LearnerDetailResponseDto | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: token, error } = await createCustomToken()

      if (token) {
        try {
          await signInWithCustomToken(auth, token)

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          navigate(-1)
          notifyError(APP_MESSAGE.ACTION_DID_FAILED('Tải đoạn chat'))
        }
      }

      if (error) {
        notifyError(error.message)
      }
    })()
  }, [createCustomToken, navigate])

  const breadcrumbsItems = [
    protectedRoute.classList,
    { ...protectedRoute.classDetail, path: protectedRoute.classDetail.path.replace(':id', classId!) },
    {
      ...protectedRoute.classLearnerDetail,
      path: protectedRoute.classLearnerDetail.path.replace(':classId', classId!).replace(':learnerId', learnerId!)
    },
    protectedRoute.chatWithLearner
  ]

  useEffect(() => {
    ;(async () => {
      const { data: session, error: apiError } = await getLearnerById(learnerId!)
      setLearnerData(session)

      if (apiError) {
        notifyError(apiError.message)
        navigate(-1)
      }
    })()
  }, [getLearnerById, learnerId, navigate])

  return user && learnerData ? (
    <>
      <PageHeader title={'Tên học viên'} breadcrumbsItems={breadcrumbsItems} />
      <Box
        sx={{
          width: '100%',
          border: '1px solid #0000003d',
          borderRadius: 1,
          marginTop: '20px',
          height: 'calc(100vh - 202px)',
          minHeight: '500px'
        }}
      >
        <ChatBox classId={classId!} learnerId={learnerId!} instructorId={user?.uid} learner={learnerData} />
      </Box>
    </>
  ) : (
    <Loading />
  )
}

export default Chat
