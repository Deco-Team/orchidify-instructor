import { Grid, Paper, Typography } from '@mui/material'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import ControlledSelect from '~/components/form/ControlledSelect'
import { ControlledFileAreaUpload, ControlledFileFieldUpload } from '~/components/form/ControlledFileUpload'
import { CourseType, FileFormat, FileSize } from '~/global/constants'
import { Control } from 'react-hook-form'
import { HeaderWrapper, Line } from './UpdateCourseForm.styled'
import { UpdateCourseDto } from '~/data/course/update-course.dto'
import ControlledSelectGrouping from '~/components/form/ControlledSelectGrouping'

interface CourseFieldsProps {
  control: Control<UpdateCourseDto>
}

const CourseFields = ({ control }: CourseFieldsProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
      <HeaderWrapper>
        <Typography variant='h5' fontWeight={'bold'}>
          Cập nhật khóa học
        </Typography>
        <Line />
      </HeaderWrapper>
      <Grid container columnSpacing={4} rowSpacing={'20px'}>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'title', control: control }}
            label='Tên khóa học'
            placeholder='Nhập tên khóa học'
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'price', control: control }}
            label='Giá'
            placeholder='Nhập giá'
            type='number'
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'description', control: control }}
            label='Mô tả khóa học'
            placeholder='Nhập mô tả'
            multiline
            minRows={4}
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledSelect
            size='small'
            controller={{ name: 'level', control: control }}
            label='Cấp độ'
            labelId='level'
            items={[
              { name: 'Chọn cấp độ', value: '' },
              { name: 'Cơ bản', value: 'BASIC' },
              { name: 'Trung bình', value: 'INTERMEDIATE' },
              { name: 'Nâng cao', value: 'ADVANCED' }
            ]}
            displayEmpty
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledSelectGrouping
            size='small'
            controller={{ name: 'type', control: control }}
            label='Thể loại'
            labelId='type'
            items={CourseType}
            displayEmpty
            placeholder='Chọn thể loại'
            multiple
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'learnerLimit', control: control }}
            label='Giới hạn học viên'
            placeholder='Nhập giới hạn học viên'
            type='number'
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledFileFieldUpload
            controller={{ name: 'thumbnail', control: control }}
            label='Thumbnail'
            clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
            minFile={1}
            maxFiles={1}
            maxFileSize={FileSize['5MB']}
          />
        </Grid>
        <Grid item xs={12}>
          <ControlledFileAreaUpload
            controller={{ name: 'media', control: control }}
            label='HÌnh ảnh khóa học'
            clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
            minFile={1}
            maxFiles={10}
            multiple
            maxFileSize={FileSize['5MB']}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CourseFields
