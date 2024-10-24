import { Box, Paper, Rating, Typography } from '@mui/material'
import RequestStatusTag from '~/components/tag/RequestStatustag'
import ClassStatusTag from '~/components/tag/ClassStatusTag'
import { ClassRequestListItemResponseDto } from '~/data/class-request/request.dto'
import { ClassStatus, CourseStatus, RequestStatus } from '~/global/constants'
import { formatRequestType } from '~/utils/format'
import { ContentWrapper, HeaderWrapper, Line } from '../ClassRequestDetail.styled'
import CourseStatusTag from '~/components/tag/CourseStatusTag'

interface FieldProps {
  label: string
  content?: string
  requestStatusTag?: RequestStatus
  courseStatusTag?: CourseStatus
  classStatusTag?: ClassStatus
  rate?: number
}

export const Field: React.FC<FieldProps> = ({
  label,
  content,
  requestStatusTag,
  courseStatusTag,
  classStatusTag,
  rate
}) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
    {requestStatusTag && <RequestStatusTag type={requestStatusTag} />}
    {courseStatusTag && <CourseStatusTag type={courseStatusTag} />}
    {classStatusTag && <ClassStatusTag type={classStatusTag} />}
    {rate && (
      <Box display='flex'>
        <Rating defaultValue={rate} precision={0.5} readOnly />
        <Typography variant='body1' marginLeft='0.5rem'>
          {rate}
        </Typography>
      </Box>
    )}
  </Box>
)

interface RequestDetailInformationProps {
  request: ClassRequestListItemResponseDto
}

const RequestDetailInformation = ({ request }: RequestDetailInformationProps) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2 }} elevation={2}>
      <HeaderWrapper>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Thông tin yêu cầu
        </Typography>
        <Line />
      </HeaderWrapper>
      <ContentWrapper>
        <Field label='Loại yêu cầu' content={formatRequestType(request.type)} />
        <Field label='Thời gian tạo' content={new Date(request.createdAt).toLocaleString('vi-vn')} />
        <Field label='Cập nhật cuối' content={new Date(request.updatedAt).toLocaleString('vi-vn')} />
        <Field label='Trạng thái' requestStatusTag={request.status} />
      </ContentWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {request.description}
        </Typography>
      </ContentWrapper>

      {request.status === RequestStatus.REJECTED && (
        <ContentWrapper>
          <Typography variant='subtitle1' fontWeight={600}>
            Lí do từ chối
          </Typography>
          <Typography variant='subtitle1' fontWeight={400}>
            {request.rejectReason}
          </Typography>
        </ContentWrapper>
      )}
    </Paper>
  )
}

export default RequestDetailInformation
