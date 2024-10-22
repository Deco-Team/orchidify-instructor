import { Add, Close, ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { ControlledFileAreaUpload } from '~/components/form/ControlledFileUpload'
import { FileFormat, FileSize } from '~/global/constants'
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayUpdate,
  UseFormClearErrors,
  UseFormTrigger
} from 'react-hook-form'
import { Line } from './UpdateCourseForm.styled'
import { UpdateCourseDto } from '~/data/course/update-course.dto'

interface SessionFieldsProps {
  control: Control<UpdateCourseDto>
  errors: FieldErrors<UpdateCourseDto>
  sessionFields: FieldArrayWithId<UpdateCourseDto, 'sessions', 'id'>[]
  sessionValues: UpdateCourseDto['sessions']
  updateSession: UseFieldArrayUpdate<UpdateCourseDto, 'sessions'>
  clearErrors: UseFormClearErrors<UpdateCourseDto>
  isSubmitted: boolean
  trigger: UseFormTrigger<UpdateCourseDto>
}

const SessionFields = ({
  control,
  errors,
  sessionFields,
  sessionValues,
  updateSession,
  clearErrors,
  isSubmitted,
  trigger
}: SessionFieldsProps) => {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const handleClick = (item: number) => {
    if (openItem === item) {
      setOpenItem(null)
    } else {
      setOpenItem(item)
    }
  }

  return (
    <Paper elevation={2} sx={{ width: '100%' }}>
      <List
        sx={{ width: '100%' }}
        aria-labelledby='session-list-subheader'
        subheader={
          <ListSubheader component='div' id='session-list-subheader' sx={{ fontSize: 16, lineHeight: 4 }}>
            Danh sách nội dung buổi học
          </ListSubheader>
        }
      >
        <Divider />
        {errors.sessions && (
          <Typography sx={{ color: 'error.main', px: 2.25, py: 1 }}>{errors.sessions.message}</Typography>
        )}
        {Array.from({ length: sessionFields.length }).map((_, index) => {
          return (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleClick(index)} selected={openItem === index}>
                <ListItemText
                  primary={`Buổi học #${index + 1} - ` + (sessionValues[index]?.title || 'Chưa có tên')}
                  primaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
                  secondary={
                    (errors.sessions?.[index]?.title && `*${errors.sessions[index].title?.message}`) ||
                    (errors.sessions?.[index]?.description && `*${errors.sessions[index].description?.message}`) ||
                    (errors.sessions?.[index]?.mediaImages && `*${errors.sessions[index].mediaImages?.message}`) ||
                    (errors.sessions?.[index]?.assignments?.[0]?.title &&
                      `*${errors.sessions[index].assignments?.[0]?.title?.message}`) ||
                    (errors.sessions?.[index]?.assignments?.[0]?.description &&
                      `*${errors.sessions[index].assignments?.[0]?.description?.message}`) ||
                    (errors.sessions?.[index]?.assignments?.[0]?.attachments &&
                      `*${errors.sessions[index].assignments?.[0]?.attachments?.message}`)
                  }
                  secondaryTypographyProps={{ color: 'error', variant: 'body2' }}
                />

                {openItem === index ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={index === openItem} timeout='auto'>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
                  <Typography variant='h6' fontWeight={500}>
                    Bài học #{index + 1}
                  </Typography>

                  <Grid container columnSpacing={4} rowSpacing={'20px'}>
                    <Grid item xs={6}>
                      <ControlledOutlinedInput
                        size='small'
                        controller={{ name: `sessions.${index}.title`, control: control }}
                        label='Tên bài học'
                        placeholder='Nhập tên bài học'
                        fullWidth
                        sx={{ gap: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledOutlinedInput
                        size='small'
                        controller={{ name: `sessions.${index}.description`, control: control }}
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
                        controller={{ name: `sessions.${index}.mediaVideo`, control: control }}
                        label='Video bài học'
                        clientAllowedFormats={[FileFormat.video]}
                        minFile={1}
                        maxFiles={1}
                        maxFileSize={FileSize['100MB']}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ControlledFileAreaUpload
                        controller={{ name: `sessions.${index}.mediaImages`, control: control }}
                        label='Tài nguyên bài học'
                        clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
                        minFile={1}
                        multiple
                        maxFiles={10}
                        maxFileSize={FileSize['5MB']}
                      />
                    </Grid>
                  </Grid>
                  {sessionValues[index]?.assignments && (
                    <>
                      <Line />
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant='h6' fontWeight={500}>
                          Bài tập
                        </Typography>
                        <IconButton
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { assignments, ...session } = sessionValues[index]
                            updateSession(index, {
                              ...session
                            })
                            clearErrors(`sessions.${index}.assignments`)
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                      <Grid container columnSpacing={4} rowSpacing={'20px'}>
                        <Grid item xs={6}>
                          <ControlledOutlinedInput
                            size='small'
                            controller={{ name: `sessions.${index}.assignments.0.title`, control: control }}
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
                            controller={{ name: `sessions.${index}.assignments.0.description`, control: control }}
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
                            controller={{ name: `sessions.${index}.assignments.0.attachments`, control: control }}
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
                    </>
                  )}
                  {!sessionValues[index]?.assignments && (
                    <Button
                      onClick={() => {
                        updateSession(index, {
                          ...sessionValues[index],
                          assignments: [{ title: '', description: '', attachments: [] }]
                        })
                        if (isSubmitted) trigger()
                      }}
                      startIcon={<Add />}
                      sx={{ maxWidth: 'fit-content' }}
                    >
                      Thêm bài tập
                    </Button>
                  )}
                </Box>
              </Collapse>
            </React.Fragment>
          )
        })}
      </List>
    </Paper>
  )
}

export default SessionFields
