import {
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography
} from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import { CreateCourseDto } from '~/data/course/create-course.dto'
import { HeaderWrapper, Line } from './CreateCourseForm.styled'
import React, { useState } from 'react'
import { Close } from '@mui/icons-material'

interface GardenToolkitsFieldsProps {
  controller: UseControllerProps<CreateCourseDto>
}

const GardenToolkitsFields = ({ controller }: GardenToolkitsFieldsProps) => {
  const {
    field,
    fieldState: { error },
    formState: { defaultValues }
  } = useController(controller)

  const [toolkits, setToolkits] = useState<string[]>(
    defaultValues?.gardenRequiredToolkits?.filter((toolkit): toolkit is string => toolkit !== undefined) ?? []
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim()
    if (event.key === 'Enter' && value) {
      setToolkits([...toolkits, value])
      field.onChange([...toolkits, value])
      event.currentTarget.value = ''
    }
  }

  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
      <HeaderWrapper>
        <Typography variant='h5' fontWeight={'bold'}>
          Dụng cụ cần thiết
        </Typography>
        <Line />
      </HeaderWrapper>
      <Grid container columnSpacing={4} rowSpacing={'20px'}>
        <Grid item xs={6}>
          <List disablePadding>
            {toolkits.map((toolkit, index) => (
              <React.Fragment key={index}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => {
                        setToolkits(toolkits.filter((_, i) => i !== index))
                        field.onChange(toolkits.filter((_, i) => i !== index))
                      }}
                    >
                      <Close />
                    </IconButton>
                  }
                >
                  <ListItemText primary={toolkit} />
                </ListItem>
                {index < toolkits.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <OutlinedInput
            placeholder='Nhập dụng cụ cần thiết và nhấn Enter'
            size='small'
            fullWidth
            error={!!error}
            onKeyDown={handleKeyDown}
          />
          {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GardenToolkitsFields
