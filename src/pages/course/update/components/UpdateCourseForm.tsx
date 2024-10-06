import { Button } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { APP_MESSAGE } from '~/global/app-message'
import { useNavigate } from 'react-router-dom'
import { StyledForm } from './UpdateCourseForm.styled'
import CourseFields from './CourseFields'
import { protectedRoute } from '~/routes/routes'
import LessonFields from './LessonFields'
import AssignmentFields from './AssignmentFields'
import { CourseDetailResponseDto } from '~/data/course/course.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { UpdateCourseDto, updateCourseSchema } from '~/data/course/update-course.dto'
import { convertArrayToString, convertStringToArray } from '~/utils/format'
import GardenToolkitsFields from './GardenToolkitsFields'

interface UpdateCourseFormProps {
  course: CourseDetailResponseDto | null
}

const UpdateCourseForm = ({ course }: UpdateCourseFormProps) => {
  const { updateCourse } = useCourseApi()
  const navigate = useNavigate()

  const defaultFormValues: UpdateCourseDto = {
    title: course?.title || '',
    description: course?.description || '',
    price: course?.price || 0,
    level: course?.level || '',
    type: course?.type || [],
    thumbnail:
      Array(Object.assign({ url: course?.thumbnail, resource_type: 'image', public_id: course?.thumbnail })) || [],
    media: course?.media || [],
    learnerLimit: course?.learnerLimit || 0,
    lessons: course?.lessons.map((lesson) => ({
      _id: lesson._id,
      title: lesson.title,
      description: lesson.description,
      mediaVideo: lesson.media.filter((media) => media.resource_type === 'video'),
      mediaImages: lesson.media.filter((media) => media.resource_type === 'image')
    })) || [
      {
        title: '',
        description: '',
        mediaVideo: [],
        mediaImages: []
      }
    ],
    assignments: course?.assignments.map((assignment) => ({
      _id: assignment._id,
      title: assignment.title,
      description: assignment.description,
      attachments: assignment.attachments
    })) || [
      {
        title: '',
        description: '',
        attachments: []
      }
    ],
    gardenRequiredToolkits: convertStringToArray(course?.gardenRequiredToolkits || '') || []
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<UpdateCourseDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(updateCourseSchema)
  })

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
    if (JSON.stringify(formData) === JSON.stringify(defaultFormValues)) {
      return
    }

    const updatedLessons = formData.lessons.map((lesson) => ({
      ...lesson,
      media: [...lesson.mediaImages, ...lesson.mediaVideo]
    }))

    console.log({ ...formData, thumbnail: formData.thumbnail[0].url, lessons: updatedLessons })

    notifyLoading()

    const { data: responseData, error: apiError } = await updateCourse(course?._id || '', {
      ...formData,
      thumbnail: formData.thumbnail[0].url,
      lessons: updatedLessons,
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

      <GardenToolkitsFields controller={{ name: 'gardenRequiredToolkits', control: control }} />  

      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Cập nhật khóa học
      </Button>
    </StyledForm>
  )
}

export default UpdateCourseForm
