import { Button } from '@mui/material'
import { StyledForm } from './CreatCourseForm.styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import LessonFields from './LessonFields'
import AssignmentFields from './AssignmentFields'
import CourseFields from './CourseField'
import { CreateCourseDto, createCourseSchema } from '~/data/course/createCourse.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { APP_MESSAGE } from '~/global/app-message'
import { useBeforeUnload, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'

const CreateCourseForm = () => {
  const { createCourse } = useCourseApi()
  const navigate = useNavigate()

  const [savedCourse] = useState<CreateCourseDto | null>(JSON.parse(localStorage.savedCourse || 'null'))

  const defaultFormValues: CreateCourseDto = {
    title: savedCourse?.title || '',
    description: savedCourse?.description || '',
    price: savedCourse?.price || 0,
    level: savedCourse?.level || '',
    type: savedCourse?.type || '',
    thumbnail: savedCourse?.thumbnail || [],
    media: savedCourse?.media || [],
    learnerLimit: savedCourse?.learnerLimit || 0,
    lessons: savedCourse?.lessons || [
      {
        title: '',
        description: '',
        mediaVideo: [],
        mediaImages: []
      }
    ],
    assignments: savedCourse?.assignments || [
      {
        title: '',
        description: '',
        attachment: []
      }
    ]
  }

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, errors }
  } = useForm<CreateCourseDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createCourseSchema)
  })

  useBeforeUnload(
    useCallback(() => {
      localStorage.savedCourse = JSON.stringify(getValues())
    }, [getValues])
  )

  const {
    fields: lessonFields,
    append: addLesson,
    remove: removeLesson
  } = useFieldArray({
    control,
    name: 'lessons'
  })

  const {
    fields: assignmentFields,
    append: addAssignment,
    remove: removeAssignment
  } = useFieldArray({
    control,
    name: 'assignments'
  })

  const onSubmit = handleSubmit(async (formData) => {
    const updatedLessons = formData.lessons.map((lesson) => ({
      ...lesson,
      media: [...lesson.mediaImages, ...lesson.mediaVideo]
    }))

    notifyLoading()

    const { error } = await createCourse({
      ...formData,
      thumbnail: formData.thumbnail[0].url,
      lessons: updatedLessons
    })

    if (error) {
      notifyError(error.message)
      return
    }
    localStorage.removeItem('savedCourse')
    notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Tạo khóa học'))
    navigate('/courses')
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <CourseFields control={control} />

      <LessonFields
        control={control}
        errors={errors}
        lessonFields={lessonFields}
        addLesson={addLesson}
        removeLesson={removeLesson}
      />

      <AssignmentFields
        control={control}
        errors={errors}
        assignmentFields={assignmentFields}
        addAssignment={addAssignment}
        removeAssignment={removeAssignment}
      />

      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Tạo khóa học
      </Button>
    </StyledForm>
  )
}

export default CreateCourseForm
