import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import dayjs from 'dayjs'
import { AssignmentDto } from '~/data/course/course.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { Box, Button, FormHelperText, OutlinedInput } from '@mui/material'
import { useClassApi } from '~/hooks/api/useClassApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  deadline: string
}

const validationSchema = z.object({
  deadline: z.string().min(1, APP_MESSAGE.REQUIRED_FIELD('Thời hạn nộp bài'))
})

interface UpdateAssignmentFormProps {
  classId: string
  assignment: AssignmentDto & {
    minDeadline: string
    maxDeadline: string
  }
}

const UpdateAssignmentDeadlineForm = ({ classId, assignment }: UpdateAssignmentFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors }
  } = useForm<FormValues>({
    defaultValues: {
      deadline: dayjs(assignment.deadline).format('YYYY-MM-DD')
    },
    resolver: zodResolver(validationSchema)
  })
  const { updateClassAssignment } = useClassApi()

  const handleUpdate = async (data: FormValues) => {
    const request = { ...data, deadline: dayjs(data.deadline).toISOString() }
    const { error } = await updateClassAssignment(classId, assignment._id, request)

    if (error) {
      notifyError(error.message)
      return
    }

    notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Cập nhật thời hạn nộp bài'))
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)} style={{ display: 'flex', width: '58%', maxWidth: '597px' }}>
      <Box flexGrow={1}>
        <OutlinedInput
          error={!!errors.deadline}
          {...register('deadline')}
          type='date'
          fullWidth
          size='small'
          inputProps={{
            min: dayjs(assignment.minDeadline).format('YYYY-MM-DD'),
            max: dayjs(assignment.maxDeadline).format('YYYY-MM-DD')
          }}
        />
        {errors.deadline ? <FormHelperText error>{errors.deadline.message}</FormHelperText> : null}
      </Box>
      <Button disabled={isSubmitting} type='submit' sx={{ width: '60px', height: '40px', marginLeft: '1.875rem' }}>
        Lưu
      </Button>
    </form>
  )
}

export default UpdateAssignmentDeadlineForm
