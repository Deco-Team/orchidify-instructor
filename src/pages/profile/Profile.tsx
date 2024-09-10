import { Box, Button, Paper, Typography, Link as MuiLink } from '@mui/material'
import { protectedRoute } from '~/routes/routes'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@mui/icons-material'
import { Avatar, DataWrapper, HeaderWrapper, Line, StyledContainer, TitleWrapper } from './Profile.styled'
import { InstructorStatus } from '~/global/constants'
import InstructorStatusTag from '~/components/tag/InstructorStatusTag'
import { InstructorDto } from '~/data/profile/instructor.dto'

const dumpData: InstructorDto = {
  email: 'example@gmail.com',
  _id: '1',
  name: 'Nguyen Van A',
  phone: '0123456789',
  dateOfBirth: new Date('2024-09-10T15:45:42.350Z'),
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus nibh, fermentum vel viverra in, feugiat at neque. Donec lobortis massa vitae dolor pretium, vitae venenatis est efficitur. Aenean luctus metus quis neque congue porttitor. Aenean tincidunt metus sed nisi rhoncus, eu aliquam augue dapibus. ',
  avatar: 'https://picsum.photos/200/300',
  status: InstructorStatus.ACTIVE,
  balance: 1000000,
  paymentInfo: {
    bankName: 'Bank of America',
    bankShortName: 'BOA',
    bankCode: '123',
    accountNumber: '123456789',
    accountName: 'Nguyen Van A'
  }
}

interface FieldProps {
  label: string
  content?: string
  statusTag?: React.ReactNode
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
    {statusTag}
  </DataWrapper>
)

const Profile = () => {
  const [instructorData] = useState(dumpData)

  return (
    <StyledContainer>
      <TitleWrapper>
        <Typography variant='h4' fontWeight='bold'>
          Trang cá nhân
        </Typography>
        <Button component={Link} to={protectedRoute.profile.path} color='warning'>
          Cập nhật
        </Button>
      </TitleWrapper>
      <Paper sx={{ display: 'flex', p: 3, gap: 2 }} elevation={2}>
        <Avatar src={instructorData.avatar} alt='avatar' />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant='h6'>{instructorData.name}</Typography>
          <Typography variant='subtitle2' color={'#3c3c4399'}>
            Giảng viên
          </Typography>
          <Typography variant='body1' fontWeight={400}>
            {instructorData.bio}
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
        <Field label='Tên giảng viên' content={instructorData.name} />
        <Field label='Ngày sinh' content={instructorData.dateOfBirth.toLocaleDateString()} />
        <Field label='Email' content={instructorData.email} />
        <Field label='Số điện thoại' content={instructorData.phone} />
        <Field label='Trạng thái' statusTag={<InstructorStatusTag type={instructorData.status} />} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MuiLink
            component={Link}
            to={protectedRoute.profile.path}
            underline='always'
            marginLeft={'192px'}
            color={'inherit'}
            fontWeight={500}
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
          content={instructorData.paymentInfo.bankName + ' - ' + instructorData.paymentInfo.bankShortName}
        />
        <Field label='Tên TK' content={instructorData.paymentInfo.accountName} />
        <Field label='STK' content={instructorData.paymentInfo.accountNumber} />
        <Field label='Số dư hệ thống' content={Intl.NumberFormat('en-DE').format(instructorData.balance) + 'đ'} />
      </Paper>
    </StyledContainer>
  )
}

export default Profile
