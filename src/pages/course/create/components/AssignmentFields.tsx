import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import { HeaderWrapper, Line } from './CreateCourseForm.styled'
import React from 'react'
import { Add, Close } from '@mui/icons-material'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { ControlledFileAreaUpload } from '~/components/form/ControlledFileUpload'
import { Control, FieldArrayWithId, FieldErrors } from 'react-hook-form'
import { FileFormat, FileSize } from '~/global/constants'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { CreateCourseDto } from '~/data/course/create-course.dto'

interface AssignmentFieldsProps {
  control: Control<CreateCourseDto>
  errors: FieldErrors<CreateCourseDto>
  assignmentFields: FieldArrayWithId<CreateCourseDto, 'assignments', 'id'>[]
  addAssignment: (assignment: { title: string; description: string; attachment: CloudinaryFileUploadedInfo[] }) => void
  removeAssignment: (index: number) => void
}

const AssignmentFields = ({
  control,
  errors,
  assignmentFields,
  addAssignment,
  removeAssignment
}: AssignmentFieldsProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
      <HeaderWrapper>
        <Typography variant='h5' fontWeight={'bold'}>
          Bài tập
        </Typography>
        <Line />
      </HeaderWrapper>
      {(errors.assignments?.root || errors.assignments?.message) && (
        <Typography color='error' variant='body2'>
          *{errors.assignments.root?.message || errors.assignments.message}
        </Typography>
      )}
      {assignmentFields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='h6' fontWeight={500}>
              Bài tập #{index + 1}
            </Typography>
            {assignmentFields.length > 1 && (
              <IconButton onClick={() => removeAssignment(index)}>
                <Close />
              </IconButton>
            )}
          </Box>
          <Grid container columnSpacing={4} rowSpacing={'20px'}>
            <Grid item xs={6}>
              <ControlledOutlinedInput
                size='small'
                controller={{ name: `assignments.${index}.title`, control: control }}
                label='Tên bài tập'
                placeholder='Nhập tên bài tập'
                fullWidth
                sx={{ gap: 1 }}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={4} rowSpacing={'20px'}>
            <Grid item xs={6}>
              <ControlledOutlinedInput
                size='small'
                controller={{ name: `assignments.${index}.description`, control: control }}
                label='Mô tả bài tập'
                placeholder='Nhập mô tả bài tập'
                multiline
                minRows={8}
                fullWidth
                sx={{ gap: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledFileAreaUpload
                controller={{ name: `assignments.${index}.attachment`, control: control }}
                label='Tài liệu'
                clientAllowedFormats={[
                  FileFormat.jpeg,
                  FileFormat.jpg,
                  FileFormat.png,
                  FileFormat.doc,
                  FileFormat.docx,
                  FileFormat.pdf
                ]}
                minFile={1}
                maxFiles={1}
                maxFileSize={FileSize['20MB']}
              />
            </Grid>
          </Grid>
          {index !== assignmentFields.length - 1 && <Line />}
        </React.Fragment>
      ))}
      {assignmentFields.length < 3 && (
        <Button
          onClick={() => addAssignment({ title: '', description: '', attachment: [] })}
          endIcon={<Add />}
          sx={{ maxWidth: 'fit-content' }}
        >
          Thêm bài học
        </Button>
      )}
    </Paper>
  )
}

export default AssignmentFields
