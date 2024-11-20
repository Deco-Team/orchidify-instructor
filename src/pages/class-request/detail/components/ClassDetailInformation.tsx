import { Grid, Paper, Typography } from '@mui/material'
import { ClassRequestDetailResponseDto } from '~/data/class-request/class-request.dto'
import { ContentWrapper, HeaderWrapper, Line } from '../ClassRequestDetail.styled'
import { Field } from './RequestDetailInformation'
import { convertArrayToString, formatWeekdays } from '~/utils/format'
import { RequestType } from '~/global/constants'
// import { RequestType } from '~/global/constants'

interface ClassDetailInformationProps {
  request: ClassRequestDetailResponseDto
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
        {request.type === RequestType.CANCEL_CLASS && (
          <>
            <Field label='Mã lớp học' content={request.class?.code} />
            <Field
              label='Số lượng học viên'
              content={`${request.class?.learnerQuantity}/${request.class?.learnerLimit}`}
            />
            <Field label='Trạng thái' classStatusTag={request.class?.status} />
          </>
        )}

        <Grid container rowGap={1}>
          <Grid item xs={6}>
            <Field
              label='Ngày bắt đầu'
              content={new Date(
                request.type === RequestType.PUBLISH_CLASS ? request.metadata.startDate : request.class!.startDate
              ).toLocaleDateString('vi-vn')}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              label='Thời lượng'
              content={`${request.type === RequestType.PUBLISH_CLASS ? request.metadata.duration : request.class!.duration} tuần`}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              label='Ngày học trong tuần'
              content={convertArrayToString(
                formatWeekdays(
                  request.type === RequestType.PUBLISH_CLASS ? request.metadata.weekdays : request.class!.weekdays
                )
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              label='Tiết học'
              content={
                'Tiết ' +
                convertArrayToString(
                  request.type === RequestType.PUBLISH_CLASS ? request.metadata.slotNumbers : request.class!.slotNumbers
                )
              }
            />
          </Grid>
        </Grid>
      </ContentWrapper>
    </Paper>
  )
}

export default ClassDetailInformation
