import { Grid, InputAdornment, Paper, Typography } from '@mui/material'
import { HeaderWrapper, Line } from './CreateCourseForm.styled'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import ControlledSelect from '~/components/form/ControlledSelect'
import { ControlledFileAreaUpload, ControlledFileFieldUpload } from '~/components/form/ControlledFileUpload'
import { FileFormat, FileSize } from '~/global/constants'
import { Control } from 'react-hook-form'
import { CreateCourseDto } from '~/data/course/create-course.dto'
import ControlledSelectGrouping from '~/components/form/ControlledSelectGrouping'
import { CourseTypesResponstDto } from '~/data/course/course.dto'

interface CourseFieldsProps {
  control: Control<CreateCourseDto>
  courseTypes: CourseTypesResponstDto[] | null
}

const CourseFields = ({ control, courseTypes }: CourseFieldsProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
      <HeaderWrapper>
        <Typography variant='h5' fontWeight={'bold'}>
          Thông tin khóa học
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
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'price', control: control }}
            label='Giá'
            placeholder='Nhập giá'
            inputMode='numeric'
            endAdornment={<InputAdornment position='end'>₫</InputAdornment>}
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'learnerLimit', control: control }}
            label='Giới hạn học viên'
            placeholder='Nhập giới hạn học viên'
            inputMode='numeric'
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
              { name: 'Cơ bản', value: 'BASIC' },
              { name: 'Trung bình', value: 'INTERMEDIATE' },
              { name: 'Nâng cao', value: 'ADVANCED' }
            ]}
            displayEmpty
            placeholder='Chọn cấp độ'
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledSelectGrouping
            size='small'
            controller={{ name: 'type', control: control }}
            label='Thể loại'
            labelId='type'
            items={courseTypes || []}
            displayEmpty
            placeholder='Chọn thể loại'
            multiple
            maxItems={3}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledOutlinedInput
            size='small'
            controller={{ name: 'duration', control: control }}
            label='Thời lượng'
            description='Thời lượng tối thiểu là 1 tuần và tối đa là 12 tuần'
            inputMode='numeric'
            endAdornment={<InputAdornment position='end'>tuần</InputAdornment>}
            fullWidth
            sx={{ gap: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <ControlledFileAreaUpload
            controller={{ name: 'media', control: control }}
            label='Hình ảnh khóa học'
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
