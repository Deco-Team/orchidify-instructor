import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { HeaderWrapper, Line, StyledForm } from './UpdateCourseComboForm.styled'
import { useCourseComboApi } from '~/hooks/api/useCourseComboApi'
import { useNavigate } from 'react-router-dom'
import {
  CreateUpdateCourseComboDto,
  createUpdateCourseComboSchema
} from '~/data/course-combo/create-update-course-combo.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { CourseListItemResponseDto } from '~/data/course/course.dto'
import { APP_MESSAGE } from '~/global/app-message'
import Table from '~/components/table/Table'
import { courseComboColumns } from './course-combo-columns'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { CourseComboDetailResponseDto } from '~/data/course-combo/courseCombo'

interface UpdateCourseComboFormProps {
  courseList: CourseListItemResponseDto[]
  comboDetail: CourseComboDetailResponseDto
}

const UpdateCourseComboForm = ({ courseList, comboDetail }: UpdateCourseComboFormProps) => {
  const navigate = useNavigate()
  const { updateCourseCombo } = useCourseComboApi()

  const [selectedValue, setSelectedValue] = useState<CourseListItemResponseDto | null>(null)

  const defaultFormValues: CreateUpdateCourseComboDto = {
    title: comboDetail.title,
    description: comboDetail.description,
    discount: comboDetail.discount,
    childCourseIds: comboDetail.childCourseIds
  }

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { isSubmitting, errors, isSubmitted }
  } = useForm<CreateUpdateCourseComboDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createUpdateCourseComboSchema)
  })

  const formValues = watch()

  const onSubmit = handleSubmit(async (formData) => {
    if (JSON.stringify(formData) === JSON.stringify(defaultFormValues)) {
      return
    }

    notifyLoading()

    const { data, error } = await updateCourseCombo(comboDetail._id, formData)
    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Cập nhật Combo khóa học'))
      navigate(-1)
    }

    if (error) {
      notifyError(error.message)
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Thông tin Combo khóa học
          </Typography>
          <Line />
        </HeaderWrapper>
        <Grid container columnSpacing={4} rowSpacing={'20px'}>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'title', control: control }}
              label='Tên Combo khóa học'
              placeholder='Nhập tên Combo khóa học'
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'discount', control: control }}
              label='Giảm giá (%)'
              placeholder='Nhập giảm giá'
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'description', control: control }}
              label='Mô tả Combo khóa học'
              placeholder='Nhập mô tả Combo khóa học'
              multiline
              minRows={4}
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container columnSpacing={4} rowSpacing={'20px'}>
        <Grid item xs={6} sx={{ alignContent: 'center' }}>
          <Typography>Chọn khóa học trong combo</Typography>
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            size='small'
            disablePortal
            options={courseList.filter((course) => !formValues.childCourseIds.includes(course._id))}
            getOptionLabel={(option) => option.code + ' - ' + option.title}
            isOptionEqualToValue={(option, value) =>
              option.code + ' - ' + option.title === value.code + ' - ' + value.title
            }
            noOptionsText={APP_MESSAGE.THERE_IS_NO_SEARCH_RESULT}
            sx={{ gap: 1 }}
            disabled={formValues.childCourseIds.length >= 3}
            value={selectedValue}
            renderInput={(params) => (
              <TextField {...params} error={!!errors.childCourseIds} placeholder='Chọn khóa học' variant='outlined' />
            )}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(_event: any, newValue: CourseListItemResponseDto | null) => {
              if (newValue) {
                setValue('childCourseIds', [...formValues.childCourseIds, newValue._id])
                setSelectedValue(null)
              }
              if (isSubmitted) trigger('childCourseIds')
            }}
            blurOnSelect={true}
          />
          {errors.childCourseIds ? <FormHelperText error>{errors.childCourseIds.message}</FormHelperText> : null}
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Table
          marginTop='0'
          title='Danh sách khóa học trong combo'
          tableOptions={{
            columns: courseComboColumns,
            data: courseList
              .filter((course) => formValues.childCourseIds.includes(course._id))
              .sort((a, b) => formValues.childCourseIds.indexOf(a._id) - formValues.childCourseIds.indexOf(b._id)),
            rowCount: formValues.childCourseIds.length,
            enableBottomToolbar: false,
            enableSorting: true,
            enableColumnFilters: false,
            enableHiding: false,
            enableColumnActions: false,
            manualSorting: false,
            enableRowActions: true,
            positionActionsColumn: 'last',
            displayColumnDefOptions: {
              'mrt-row-actions': {
                header: '',
                size: 70,
                grow: false,
                muiTableBodyCellProps: {
                  align: 'center'
                }
              }
            },
            renderRowActions: (props) => (
              <Tooltip title='Xóa'>
                <IconButton
                  onClick={() => {
                    setValue(
                      'childCourseIds',
                      formValues.childCourseIds.filter((courseId) => courseId !== props.row.original._id)
                    )
                    if (isSubmitted) trigger('childCourseIds')
                  }}
                >
                  <Delete sx={{ color: '#000000dd' }} />
                </IconButton>
              </Tooltip>
            )
          }}
        />
      </Box>
      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Cập nhật Combo
      </Button>
    </StyledForm>
  )
}

export default UpdateCourseComboForm
