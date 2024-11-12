import PageHeader from '~/components/header/PageHeader'
import certificateImg from '~/assets/certificate.svg'
import { StyledContainer, TitleWrapper } from '../Profile.styled'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { Add } from '@mui/icons-material'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import React, { useEffect, useState } from 'react'
import { InstructorCertificationDto } from '~/data/profile/instructor.dto'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'

const Certifications = () => {
  const breadcrumbsItems = [protectedRoute.profile, protectedRoute.certifications]

  const { getInstructorCertifications } = useProfileApi()
  const [data, setData] = useState<InstructorCertificationDto[] | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: certifications, error } = await getInstructorCertifications()

      if (certifications) {
        setData(certifications)
      }

      if (error) {
        notifyError(error.message)
      }
    })()
  }, [getInstructorCertifications])

  return data ? (
    <StyledContainer>
      <TitleWrapper>
        <PageHeader title='Chứng chỉ của tôi' breadcrumbsItems={breadcrumbsItems} />
        <Button color='secondary' component={Link} to={protectedRoute.profile.path} endIcon={<Add />}>
          Thêm chứng chỉ
        </Button>
      </TitleWrapper>
      <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2.5 }} elevation={2}>
        {data.map((certificate, index) => (
          <React.Fragment key={index}>
            <Box display='flex' alignItems='center' position='relative'>
              <Box width='107px' height='80px' marginRight='1.25rem'>
                <img
                  src={certificate.url.replace('.pdf', '.png')}
                  alt={certificate.name}
                  onError={(event) => (event.currentTarget.src = certificateImg)}
                  width='100%'
                  height='100%'
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Typography variant='body1'>{certificate.name}</Typography>
              <Typography
                variant='caption'
                sx={{ position: 'absolute', right: 2, bottom: 2, textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => window.open(certificate.url, '_blank')}
              >
                Xem chi tiết
              </Typography>
            </Box>
            {index !== data.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </Paper>
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default Certifications
