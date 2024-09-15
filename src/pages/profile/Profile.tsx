import { Box, Button, Paper, Typography, Link as MuiLink } from '@mui/material'
import { protectedRoute } from '~/routes/routes'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@mui/icons-material'
import { Avatar, DataWrapper, HeaderWrapper, Line, StyledContainer, TitleWrapper } from './Profile.styled'
import { InstructorStatus } from '~/global/constants'
import InstructorStatusTag from '~/components/tag/InstructorStatusTag'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { InstructorDto } from '~/data/profile/instructor.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useProfileApi } from '~/hooks/api/useProfileApi'

interface FieldProps {
  label: string
  content?: string
  statusTag?: InstructorStatus
}

const Field: React.FC<FieldProps> = ({ label, content, statusTag }) => (
  <DataWrapper>
    <Typography variant='subtitle1' fontWeight={500} color={'#3c3c4399'} width={'160px'} textAlign={'right'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='body1' fontWeight={500}>
        {content}
      </Typography>
    )}
    {statusTag && <InstructorStatusTag type={statusTag} />}
  </DataWrapper>
)

const Profile = () => {
  const [data, setData] = useState<InstructorDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { getProfile } = useProfileApi()

  useEffect(() => {
    ;(async () => {
      const { data: instructor, error: apiError } = await getProfile()
      setData(instructor)
      setError(apiError)
    })()
  }, [getProfile])

  if (error) {
    notifyError(error.message)
  }

  return data ? (
    <StyledContainer>
      <TitleWrapper>
        <Typography variant='h4' fontWeight='bold'>
          Trang cá nhân
        </Typography>
        <Button component={Link} to={protectedRoute.editProfile.path} color='warning'>
          Cập nhật
        </Button>
      </TitleWrapper>

      <Paper sx={{ display: 'flex', p: 3, gap: 2 }} elevation={2}>
        <Avatar src={data.avatar} alt='avatar' />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant='h6'>{data.name}</Typography>
          <Typography variant='subtitle2' color={'#3c3c4399'}>
            Giảng viên
          </Typography>
          <Typography variant='body1' fontWeight={400}>
            {data.bio ? data.bio : 'Chưa cập nhật'}
          </Typography>
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 1.5 }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Thông tin cá nhân
          </Typography>
          <Line />
        </HeaderWrapper>
        <Field label='Tên giảng viên' content={data.name} />
        <Field label='Ngày sinh' content={new Date(data.dateOfBirth || '').toLocaleDateString()} />
        <Field label='Email' content={data.email} />
        <Field label='Số điện thoại' content={data.phone} />
        <Field label='Trạng thái' statusTag={data.status} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MuiLink
            component={Link}
            to={protectedRoute.profile.path}
            underline='always'
            marginLeft={'192px'}
            color={'inherit'}
            fontWeight={500}
            sx={{}}
          >
            Chứng chỉ của tôi
          </MuiLink>
          <ArrowForward />
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 1.5 }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Thông tin TK ngân hàng
          </Typography>
          <Line />
        </HeaderWrapper>

        <Field
          label='Tên ngân hàng'
          content={
            data.paymentInfo.bankName
              ? data.paymentInfo.bankShortName + ' - ' + data.paymentInfo.bankName
              : 'Chưa cập nhật'
          }
        />
        <Field label='Tên TK' content={data.paymentInfo.accountName ? data.paymentInfo.accountName : 'Chưa cập nhật'} />
        <Field
          label='STK'
          content={data.paymentInfo.accountNumber ? data.paymentInfo.accountNumber : 'Chưa cập nhật'}
        />
        <Field label='Số dư hệ thống' content={Intl.NumberFormat('en-DE').format(data.balance || 0) + 'đ'} />
      </Paper>
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default Profile
