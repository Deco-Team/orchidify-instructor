import { Box, Grid, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import { HeaderWrapper, Line } from './PublishClassForm.styled'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import {
  /* ONE_MONTH_ADDITIONAL,  */ PublishClasDto,
  THREE_MONTH_ADDITIONAL
} from '~/data/class-request/publish-class.dto'
import ControlledSelect from '~/components/form/ControlledSelect'
import { SlotNumber, Weekday } from '~/global/constants'
import { Control } from 'react-hook-form'
import { convertStringToArray } from '~/utils/format'

interface PublishFormFieldsProps {
  control: Control<PublishClasDto>
  formValues: PublishClasDto
  duration: number
  slotNumbersData: { name: string; value: SlotNumber }[]
  getSlotNumbers: () => Promise<void>
}

const PublishFormFields = ({
  control,
  formValues,
  duration,
  slotNumbersData,
  getSlotNumbers
}: PublishFormFieldsProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
      <HeaderWrapper>
        <Typography variant='h5' fontWeight={'bold'}>
          Yêu cầu mở
        </Typography>
        <Line />
      </HeaderWrapper>
      <Grid container columnSpacing={4} rowSpacing={'20px'}>
        <Grid item xs={12}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'description', control: control }}
            label='Mô tả yêu cầu'
            placeholder='Nhập mô tả yêu cầu'
            multiline
            minRows={4}
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'startDate', control: control }}
            label='Ngày bắt đầu'
            description='Ngày bắt đầu tối thiểu là 1 tháng sau và tối đa là 3 tháng'
            type='date'
            inputProps={{
              min: new Date(/* ONE_MONTH_ADDITIONAL */).toLocaleString('sv').split(' ')[0],

              max: new Date(THREE_MONTH_ADDITIONAL).toLocaleString('sv').split(' ')[0]
            }}
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'weekdaysString', control: control }}
            label='Ngày học trong tuần'
            placeholder='Ngày học'
            description='Ngày học được chọn tự động theo ngày bắt đầu và theo thứ tự: T2-T5, T3-T6, T4-T7'
            value={
              formValues.weekdaysString
                ? convertStringToArray(formValues.weekdaysString)
                    .map((weekday) => {
                      switch (weekday) {
                        case Weekday.MONDAY:
                          return 'T2'
                        case Weekday.TUESDAY:
                          return 'T3'
                        case Weekday.WEDNESDAY:
                          return 'T4'
                        case Weekday.THURSDAY:
                          return 'T5'
                        case Weekday.FRIDAY:
                          return 'T6'
                        case Weekday.SATURDAY:
                          return 'T7'
                        default:
                          return ''
                      }
                    })
                    .join(', ')
                : ''
            }
            readOnly
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <InputLabel sx={{ color: '#000000' }}>Thời lượng</InputLabel>
              {/* <FormHelperText>Thời lượng tối thiểu là 1 tuần và tối đa là 12 tuần</FormHelperText> */}
            </Box>
            <Box>
              <OutlinedInput
                size='small'
                value={duration}
                fullWidth
                disabled
                endAdornment={<InputAdornment position='end'>tuần</InputAdornment>}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <ControlledSelect
            size='small'
            controller={{ name: 'slotNumber', control: control }}
            label='Tiết học'
            labelId='slotNumber'
            items={slotNumbersData}
            displayEmpty
            onOpen={getSlotNumbers}
            placeholder='Chọn tiết học'
            renderChips={false}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PublishFormFields
