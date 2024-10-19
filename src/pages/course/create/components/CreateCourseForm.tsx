import { Button } from '@mui/material'
import { StyledForm } from './CreateCourseForm.styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import CourseFields from './CourseFields'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { APP_MESSAGE } from '~/global/app-message'
import { useBeforeUnload, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { CreateCourseDto, createCourseSchema } from '~/data/course/create-course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { protectedRoute } from '~/routes/routes'
import { convertArrayToString } from '~/utils/format'
import GardenToolkitsFields from './GardenToolkitsFields'
import SessionFields from './SessionFields'
import { CourseTypesResponstDto } from '~/data/course/course.dto'

const CreateCourseForm = () => {
  const { createCourse, getCourseTypes } = useCourseApi()
  const navigate = useNavigate()

  const [savedCourse] = useState<CreateCourseDto>(JSON.parse(localStorage.savedCourse || '{}'))
  const [courseTypes, setCourseTypes] = useState<CourseTypesResponstDto[] | null>(null)

  const defaultFormValues: CreateCourseDto = {
    title: savedCourse?.title || '',
    description: savedCourse?.description || '',
    price: savedCourse?.price || 0,
    level: savedCourse?.level || '',
    type: savedCourse?.type || [],
    duration: savedCourse?.duration || 0,
    thumbnail: savedCourse?.thumbnail || [],
    media: savedCourse?.media || [],
    learnerLimit: savedCourse?.learnerLimit || 0,
    sessions: savedCourse?.sessions || [],
    gardenRequiredToolkits: savedCourse?.gardenRequiredToolkits || []
  }

  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { isSubmitting, errors, isSubmitted }
  } = useForm<CreateCourseDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createCourseSchema)
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

  // Save form data when user leaves the page
  useBeforeUnload(
    useCallback(() => {
      localStorage.savedCourse = JSON.stringify(formValues)
    }, [formValues])
  )

  const onSubmit = handleSubmit(async (formData) => {
    //check if there is no assignments in every session
    if (formData.sessions.every((session) => !session.assignments || session.assignments.length === 0)) {
      setError('sessions', {
        type: 'required',
        message: APP_MESSAGE.REQUIRED_FIELD('Bài tập cho khóa học')
      })
      return
    }

    const updatedSessions = formData.sessions.map((session) => ({
      ...session,
      media: [...session.mediaImages, ...session.mediaVideo]
    }))

    notifyLoading()

    const { data, error } = await createCourse({
      ...formData,
      thumbnail: formData.thumbnail[0].url,
      sessions: updatedSessions,
      gardenRequiredToolkits: convertArrayToString(formData.gardenRequiredToolkits)
    })

    if (error) {
      notifyError(error.message)
      return
    }

    if (data) {
      localStorage.removeItem('savedCourse')
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Tạo khóa học'))
      navigate(protectedRoute.courseList.path)
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
        />
      )}

      <GardenToolkitsFields controller={{ name: 'gardenRequiredToolkits', control: control }} />

      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Tạo khóa học
      </Button>
    </StyledForm>
  )
}

export default CreateCourseForm
