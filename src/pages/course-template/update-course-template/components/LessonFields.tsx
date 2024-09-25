import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import { Add, Close } from '@mui/icons-material'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { ControlledFileAreaUpload } from '~/components/form/ControlledFileUpload'
import { Control, FieldArrayWithId, FieldErrors } from 'react-hook-form'
import { FileFormat, FileSize } from '~/global/constants'
import { HeaderWrapper, Line } from './UpdateCourseTemplateForm.styled'
import { BaseMediaDto } from '~/data/common.dto'
import { UpdateCourseTemplateDto } from '~/data/course-template/update-course-template.dto'

interface LessonFieldsProps {
  control: Control<UpdateCourseTemplateDto>
  errors: FieldErrors<UpdateCourseTemplateDto>
  lessonFields: FieldArrayWithId<UpdateCourseTemplateDto, 'lessons', 'id'>[]
  addLesson: (lesson: {
    title: string
    description: string
    mediaVideo: BaseMediaDto[]
    mediaImages: BaseMediaDto[]
  }) => void
  removeLesson: (index: number) => void
}

const LessonFields = ({ control, errors, lessonFields, addLesson, removeLesson }: LessonFieldsProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
      <HeaderWrapper>
        <Typography variant='h5' fontWeight={'bold'}>
          Bài học
        </Typography>
        <Line />
      </HeaderWrapper>
      {(errors.lessons?.root || errors.lessons?.message) && (
        <Typography color='error' variant='body2'>
          *{errors.lessons.root?.message || errors.lessons.message}
        </Typography>
      )}
      {lessonFields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='h6' fontWeight={500}>
              Bài học #{index + 1}
            </Typography>
            {lessonFields.length > 1 && (
              <IconButton onClick={() => removeLesson(index)}>
                <Close />
              </IconButton>
            )}
          </Box>
          <Grid container columnSpacing={4} rowSpacing={'20px'}>
            <Grid item xs={6}>
              <ControlledOutlinedInput
                size='small'
                controller={{ name: `lessons.${index}.title`, control: control }}
                label='Tên bài học'
                placeholder='Nhập tên bài học'
                fullWidth
                sx={{ gap: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledOutlinedInput
                size='small'
                controller={{ name: `lessons.${index}.description`, control: control }}
                label='Mô tả bài học'
                placeholder='Nhập mô tả bài học'
                multiline
                minRows={6}
                fullWidth
                sx={{ gap: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledFileAreaUpload
                controller={{ name: `lessons.${index}.mediaVideo`, control: control }}
                label='Video bài học'
                clientAllowedFormats={[FileFormat.video]}
                minFile={1}
                maxFiles={1}
                maxFileSize={FileSize['100MB']}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledFileAreaUpload
                controller={{ name: `lessons.${index}.mediaImages`, control: control }}
                label='Tài nguyên bài học'
                clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
                minFile={1}
                multiple
                maxFiles={10}
                maxFileSize={FileSize['5MB']}
              />
            </Grid>
          </Grid>
          {index !== lessonFields.length - 1 && <Line />}
        </React.Fragment>
      ))}
      {lessonFields.length < 10 && (
        <Button
          onClick={() => addLesson({ title: '', description: '', mediaVideo: [], mediaImages: [] })}
          endIcon={<Add />}
          sx={{ maxWidth: 'fit-content' }}
        >
          Thêm bài học
        </Button>
      )}
    </Paper>
  )
}

export default LessonFields
