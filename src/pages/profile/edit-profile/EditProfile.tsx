import { Typography } from '@mui/material'
import { StyledContainer, TitleWrapper } from './EditProfile.styled'
import { protectedRoute } from '~/routes/routes'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { useEffect, useState } from 'react'
import { VietQR } from 'vietqr'
import Loading from '~/components/loading/Loading'
import { notifyError } from '~/utils/toastify'
import { InstructorDto } from '~/data/profile/instructor.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import EditProfileForm from './components/EditProfileForm'

const EditProfile = () => {
  const { getProfile } = useProfileApi()
  const [instructorData, setInstructorData] = useState<InstructorDto | null>(null)
  const [errorInstructor, setErrorInstructor] = useState<ErrorResponseDto | null>(null)
  const [bankData, setBankData] = useState([])

  if (errorInstructor) {
    notifyError(errorInstructor.message)
  }

  const vietQR = new VietQR({
    clientID: import.meta.env.VITE_VIETQR_CLIENT_ID,
    apiKey: import.meta.env.VITE_VIETQR_API_KEY
  })

  useEffect(() => {
    ;(async () => {
      const [reponse, { data: instructor, error: apiError }] = await Promise.all([vietQR.getBanks(), getProfile()])
      setBankData(reponse.data)
      setInstructorData(instructor)
      setErrorInstructor(apiError)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfile])

  return instructorData ? (
    <StyledContainer>
      <TitleWrapper>
        <Typography variant='h4' fontWeight='bold'>
          Cập nhật trang cá nhân
        </Typography>
        <Breadcrumbs
          items={[
            { name: protectedRoute.profile.name, path: protectedRoute.profile.path },
            { name: protectedRoute.editProfile.name, path: protectedRoute.editProfile.path }
          ]}
        />
      </TitleWrapper>
      <EditProfileForm instructorData={instructorData} bankData={bankData} />
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default EditProfile
