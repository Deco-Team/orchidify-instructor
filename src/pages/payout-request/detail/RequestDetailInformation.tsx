import { Box, Paper, Typography } from '@mui/material'
import RequestStatusTag from '~/components/tag/RequestStatustag'
import { RequestStatus } from '~/global/constants'
import { formatCurrency } from '~/utils/format'
import { PayoutRequestDetailResponseDto } from '~/data/payout-request/payout-request.dto'
import { ContentWrapper, HeaderWrapper, Line } from './PayoutRequestDetail.styled'

interface FieldProps {
  label: string
  content?: string
  requestStatusTag?: RequestStatus
}

export const Field: React.FC<FieldProps> = ({ label, content, requestStatusTag }) => (
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
  </Box>
)

interface RequestDetailInformationProps {
  request: PayoutRequestDetailResponseDto
}

const RequestDetailInformation = ({ request }: RequestDetailInformationProps) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2.5 }} elevation={2}>
      <HeaderWrapper>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Thông tin yêu cầu
        </Typography>
        <Line />
      </HeaderWrapper>
      <ContentWrapper>
        <Field label='Số tiền' content={formatCurrency(request.amount)} />
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
