import { Grid, Paper, Typography } from '@mui/material'
import { ClassRequestListItemResponseDto } from '~/data/class-request/class-request.dto'
import { ContentWrapper, HeaderWrapper, Line } from '../ClassRequestDetail.styled'
import { Field } from './RequestDetailInformation'
import { convertArrayToString, formatWeekdays } from '~/utils/format'
// import { RequestType } from '~/global/constants'

interface ClassDetailInformationProps {
  request: ClassRequestListItemResponseDto
}

const ClassDetailInformation = ({ request }: ClassDetailInformationProps) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2.5 }} elevation={2}>
      <HeaderWrapper>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Thông tin lớp học
        </Typography>
        <Line />
      </HeaderWrapper>

      <ContentWrapper>
        {/* {request.type === RequestType.CANCEL_CLASS && (
          <>
            <Field label='Mã lớp học' content={request.metadata.code} />
            <Field
              label='Số lượng học viên'
              content={`${request.metadata.learnerQuantity}/${request.metadata.learnerLimit}`}
            />
            <Field label='Trạng thái' classStatusTag={request.metadata.status} />
          </>
        )} */}

        <Grid container rowGap={1}>
          <Grid item xs={6}>
            <Field label='Ngày bắt đầu' content={new Date(request.metadata.startDate).toLocaleDateString('vi-vn')} />
          </Grid>
          <Grid item xs={6}>
            <Field label='Thời lượng' content={`${request.metadata.duration} tuần`} />
          </Grid>
          <Grid item xs={6}>
            <Field
              label='Ngày học trong tuần'
              content={convertArrayToString(formatWeekdays(request.metadata.weekdays))}
            />
          </Grid>
          <Grid item xs={6}>
            <Field label='Tiết học' content={'Tiết ' + convertArrayToString(request.metadata.slotNumbers)} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </Paper>
  )
}

export default ClassDetailInformation
