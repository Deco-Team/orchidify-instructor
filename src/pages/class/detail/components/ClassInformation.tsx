import { Paper, Box, Typography, Divider, Grid } from '@mui/material'
import ClassStatusTag from '~/components/tag/ClassStatusTag'
import { ClassDetailResponseDto } from '~/data/class/class.dto'
import { ClassStatus, SlotNumber, Weekday } from '~/global/constants'

interface FieldProps {
  label: string
  content?: string
  weekDays?: Array<Weekday>
  slotNumbers?: Array<SlotNumber>
  statusTag?: ClassStatus
}

const Field: React.FC<FieldProps> = ({ label, content, weekDays = [], slotNumbers = [], statusTag }) => {
  const weekDayText = weekDays.length > 0 && {
    [Weekday.MONDAY]: 'Thứ 2',
    [Weekday.TUESDAY]: 'Thứ 3',
    [Weekday.WEDNESDAY]: 'Thứ 4',
    [Weekday.THURSDAY]: 'Thứ 5',
    [Weekday.FRIDAY]: 'Thứ 6',
    [Weekday.SATURDAY]: 'Thứ 7',
    [Weekday.SUNDAY]: 'Chủ nhật'
  }

  const slotNumberText = slotNumbers.length > 0 && {
    [SlotNumber.ONE]: 'Tiết 1',
    [SlotNumber.TWO]: 'Tiết 2',
    [SlotNumber.THREE]: 'Tiết 3',
    [SlotNumber.FOUR]: 'Tiết 4'
  }

  return (
    <Box display='flex' marginY='0.25rem'>
      <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
        {label}
      </Typography>
      {content && (
        <Typography variant='subtitle1' fontWeight={400}>
          {content}
        </Typography>
      )}
      {weekDays.length > 0 && (
        <Typography variant='subtitle1' fontWeight={400}>
          {weekDays.map((day) => weekDayText && weekDayText[day as keyof typeof weekDayText]).join(', ')}
        </Typography>
      )}
      {slotNumbers.length > 0 && (
        <Typography variant='subtitle1' fontWeight={400}>
          {slotNumbers.map((day) => slotNumberText && slotNumberText[day as keyof typeof slotNumberText]).join(', ')}
        </Typography>
      )}
      {statusTag && <ClassStatusTag type={statusTag} />}
    </Box>
  )
}

interface ClassInformationProps {
  classDetail: ClassDetailResponseDto
}

const ClassInformation = ({ classDetail }: ClassInformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin lớp học
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Field label='Mã lớp học' content={classDetail.code} />
        </Grid>
        <Grid item xs={12}>
          <Field label='Số lượng học viên' content={`${classDetail.learnerQuantity}/${classDetail.learnerLimit}`} />
        </Grid>
        <Grid item xs={12}>
          <Field label='Trạng thái' statusTag={classDetail.status} />
        </Grid>
        <Grid item xs={12}>
          <Field label='Nhà vườn' content={classDetail.garden.name} />
        </Grid>
        <Grid item xs={6}>
          <Field label='Ngày bắt đầu' content={new Date(classDetail.startDate).toLocaleDateString('vi-VN')} />
        </Grid>
        <Grid item xs={6}>
          <Field label='Thời lượng' content={`${classDetail.duration} tuần`} />
        </Grid>
        <Grid item xs={6}>
          <Field label='Ngày học trong tuần' weekDays={classDetail.weekdays} />
        </Grid>
        <Grid item xs={6}>
          <Field label='Tiết học' slotNumbers={classDetail.slotNumbers} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ClassInformation
