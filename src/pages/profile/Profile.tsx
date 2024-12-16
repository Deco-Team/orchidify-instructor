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
import { formatCurrency } from '~/utils/format'
import PageHeader from '~/components/header/PageHeader'

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
        <PageHeader title='Trang cá nhân' />
        <Button component={Link} to={protectedRoute.editProfile.path} color='warning'>
          Cập nhật
        </Button>
      </TitleWrapper>

      <Paper sx={{ display: 'flex', p: 3, gap: 2 }} elevation={2}>
        <Avatar src={data.avatar ?? ''} alt='avatar' />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant='h6'>{data.name}</Typography>
          <Typography variant='subtitle2' color={'#3c3c4399'}>
            Giảng viên
          </Typography>
          <Typography variant='body1' fontWeight={400}>
            {data.bio ?? 'Chưa cập nhật'}
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
        <Field label='Ngày sinh' content={new Date(data.dateOfBirth || '').toLocaleDateString('vi-vn')} />
        <Field label='Email' content={data.email} />
        <Field label='Số điện thoại' content={data.phone} />
        <Field label='Trạng thái' statusTag={data.status} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MuiLink
            component={Link}
            to={protectedRoute.certifications.path}
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
            data.paymentInfo ? data.paymentInfo.bankShortName + ' - ' + data.paymentInfo.bankName : 'Chưa cập nhật'
          }
        />
        <Field label='Tên TK' content={data.paymentInfo ? data.paymentInfo.accountName : 'Chưa cập nhật'} />
        <Field label='STK' content={data.paymentInfo ? data.paymentInfo.accountNumber : 'Chưa cập nhật'} />
      </Paper>
      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 1.5 }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Thông tin số dư
          </Typography>
          <Line />
        </HeaderWrapper>
        <Typography variant='body1' fontWeight={400} fontStyle={'italic'}>
          *Đây là số dư bạn có trong Orchidify. Số dư này sẽ được cập nhật khi bạn thực hiện rút tiền hoặc lớp học kết
          thúc.
        </Typography>
        <Field label='Số dư hệ thống' content={formatCurrency(data.balance)} />
      </Paper>
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default Profile
