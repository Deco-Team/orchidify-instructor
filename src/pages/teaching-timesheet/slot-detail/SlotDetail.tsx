import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { SlotDto } from '~/data/teaching-timesheet/teaching-timesheet.dto'
import { useTimesheetApi } from '~/hooks/api/useTimesheetApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { ContentWrapper, HeaderWrapper, Line, StyledContainer } from './SlotDetail.styled'
import PageHeader from '~/components/header/PageHeader'
import { Box, Button, Paper, Typography } from '@mui/material'

interface FieldProps {
  label: string
  content?: string
}

const Field: React.FC<FieldProps> = ({ label, content }) => (
  <Box display='flex' width={'100%'}>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
  </Box>
)

const SlotDetail = () => {
  const params = useParams()
  const slotId = params.slotId
  const navigate = useNavigate()
  const { getSlotById } = useTimesheetApi()
  const [data, setData] = useState<SlotDto | null>()

  useEffect(() => {
    if (slotId) {
      ;(async () => {
        const { data: slotData, error: apiError } = await getSlotById(slotId)
        setData(slotData)

        if (apiError) {
          notifyError(apiError.message)
          navigate(protectedRoute.teachingTimesheet.path)
        }
      })()
    }
  }, [slotId, getSlotById, navigate])

  return data ? (
    <StyledContainer>
      <PageHeader
        title='Chi tiết tiết học'
        breadcrumbsItems={[
          { name: protectedRoute.teachingTimesheet.name, path: protectedRoute.teachingTimesheet.path },
          { name: protectedRoute.slotDetail.name, path: protectedRoute.slotDetail.path }
        ]}
      />
      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Thông tin slot
          </Typography>
          <Line />
        </HeaderWrapper>

        <ContentWrapper>
          <Field label='Ngày' content={new Date(data.start).toLocaleDateString('vi-VN')} />
          <Field
            label='Tiết học'
            content={`${data.slotNumber} (${new Date(data.start).toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric' })} - ${new Date(data.end).toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric' })})`}
          />
          <Field label='Mã lớp' content={data.class.code} />
          <Field label='Mã khóa học' content={data.class.course.code} />
          <Field label='Tên khóa học' content={data.class.title} />
          <Field label='Buổi học' content={data.metadata?.sessionNumber.toString()} />
          <Field label='Tên buổi học' content={data.metadata?.sessionTitle} />
          <Field label='Nhà vườn' content={data.garden.name} />
          <Field label='Số học viên' content={data.class.learnerQuantity.toString()} />
          <Field label='Trạng thái' content={data.hasTakenAttendance ? 'Đã điểm danh' : 'Chưa điểm danh'} />
          {data.hasTakenAttendance && (
            <Field label='Cập nhật cuối' content={new Date(data.updatedAt).toLocaleString('vi-vn')} />
          )}
        </ContentWrapper>
      </Paper>
      <Button
        sx={{ maxWidth: 'fit-content', mx: 'auto' }}
        component={Link}
        to={protectedRoute.attendanceList.path.replace(':slotId', data._id)}
      >
        {new Date().toLocaleString('sv').split(' ')[0] > new Date(data.start).toLocaleString('sv').split(' ')[0] ||
        data.hasTakenAttendance
          ? 'Xem điểm danh'
          : 'Điểm danh'}
      </Button>
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default SlotDetail
