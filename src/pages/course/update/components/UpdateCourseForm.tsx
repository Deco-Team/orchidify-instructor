import { Button } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { APP_MESSAGE } from '~/global/app-message'
import { useNavigate } from 'react-router-dom'
import { StyledForm } from './UpdateCourseForm.styled'
import CourseFields from './CourseFields'
import { protectedRoute } from '~/routes/routes'
import { CourseDetailResponseDto, CourseTypesResponstDto } from '~/data/course/course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { UpdateCourseDto, updateCourseSchema } from '~/data/course/update-course.dto'
import { convertArrayToString, convertStringToArray } from '~/utils/format'
import GardenToolkitsFields from './GardenToolkitsFields'
import { useEffect, useState } from 'react'
import SessionFields from './SessionFields'

interface UpdateCourseFormProps {
  course: CourseDetailResponseDto | null
}

const UpdateCourseForm = ({ course }: UpdateCourseFormProps) => {
  const { updateCourse, getCourseTypes } = useCourseApi()
  const navigate = useNavigate()

  const [courseTypes, setCourseTypes] = useState<CourseTypesResponstDto[] | null>(null)

  const defaultFormValues: UpdateCourseDto = {
    title: course?.title || '',
    description: course?.description || '',
    price: course?.price || 0,
    level: course?.level || '',
    type: course?.type || [],
    duration: course?.duration || 0,
    thumbnail:
      Array(Object.assign({ url: course?.thumbnail, resource_type: 'image', public_id: course?.thumbnail })) || [],
    media: course?.media || [],
    learnerLimit: course?.learnerLimit || 0,
    sessions: course?.sessions.map((session) => ({
      _id: session._id,
      title: session.title,
      description: session.description,
      mediaVideo: session.media.filter((media) => media.resource_type === 'video'),
      mediaImages: session.media.filter((media) => media.resource_type === 'image'),
      assignments:
        session.assignments.length > 0
          ? session.assignments.map((assignment) => ({
              _id: assignment._id,
              title: assignment.title,
              description: assignment.description,
              attachments: assignment.attachments
            }))
          : undefined
    })) || [
      {
        title: '',
        description: '',
        mediaVideo: [],
        mediaImages: []
      }
    ],
    gardenRequiredToolkits: convertStringToArray(course?.gardenRequiredToolkits || '') || []
  }

  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { isSubmitting, errors, isSubmitted }
  } = useForm<UpdateCourseDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(updateCourseSchema)
  })

  const {
    fields: sessionFields,
    append: addSession,
    remove: removeSession,
    update: updateSession
  } = useFieldArray({
    control,
    name: 'sessions'
  })

  const formValues = watch()

  const numberOfSessions = formValues.duration * 2 // Calculate based on duration

  useEffect(() => {
    if (numberOfSessions > sessionFields.length) {
      for (let i = sessionFields.length; i < numberOfSessions && i < 24; i++) {
        addSession({
          title: '',
          description: '',
          mediaVideo: [],
          mediaImages: []
        })
      }
      if (isSubmitted) trigger('sessions')
    } else if (numberOfSessions < sessionFields.length) {
      for (let i = sessionFields.length; i > numberOfSessions; i--) {
        removeSession(i - 1)
      }
    }
  }, [formValues.duration, numberOfSessions, sessionFields.length, addSession, removeSession, isSubmitted, trigger])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getCourseTypes()
      if (data) {
        setCourseTypes(data)
      }
      if (error) {
        notifyError(error.message)
      }
    })()
  }, [getCourseTypes])

  const onSubmit = handleSubmit(async (formData) => {
    //check if there is no assignments in every session
    if (formData.sessions.every((session) => !session.assignments || session.assignments.length === 0)) {
      setError('sessions', {
        type: 'required',
        message: APP_MESSAGE.REQUIRED_FIELD('Bài tập cho khóa học')
      })
      return
    }

    if (JSON.stringify(formData) === JSON.stringify(defaultFormValues)) {
      console.log('No change')
      return
    }

    const updatedSessions = formData.sessions.map((session) => ({
      ...session,
      media: [...session.mediaImages, ...session.mediaVideo]
    }))

    notifyLoading()

    const { data: responseData, error: apiError } = await updateCourse(course?._id || '', {
      ...formData,
      thumbnail: formData.thumbnail[0].url,
      sessions: updatedSessions,
      gardenRequiredToolkits: convertArrayToString(formData.gardenRequiredToolkits)
    })
    if (apiError) {
      notifyError(apiError.message)
    }
    if (responseData?.success) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Cập nhật khóa học'))
      navigate(protectedRoute.courseDetail.path.replace(':id', course?._id || ''))
    }
  })

  return (
    <StyledForm
      onSubmit={onSubmit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
        }
      }}
    >
      <CourseFields control={control} courseTypes={courseTypes} />

      {formValues.duration > 0 && (
        <SessionFields
          control={control}
          errors={errors}
          sessionFields={sessionFields}
          sessionValues={formValues.sessions}
          updateSession={updateSession}
          clearErrors={clearErrors}
          isSubmitted={isSubmitted}
          trigger={trigger}
        />
      )}

      <GardenToolkitsFields controller={{ name: 'gardenRequiredToolkits', control: control }} />

      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Cập nhật khóa học
      </Button>
    </StyledForm>
  )
}

export default UpdateCourseForm
