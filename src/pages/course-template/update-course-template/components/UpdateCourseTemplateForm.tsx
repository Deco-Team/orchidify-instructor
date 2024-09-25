import { Button } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { APP_MESSAGE } from '~/global/app-message'
import { useNavigate } from 'react-router-dom'
import { StyledForm } from './UpdateCourseTemplateForm.styled'
import CourseFields from './CourseFields'
import { protectedRoute } from '~/routes/routes'
import { CourseTemplateDetailResponseDto } from '~/data/course-template/course-template.dto'
import LessonFields from './LessonFields'
import AssignmentFields from './AssignmentFields'
import { useCourseTemplateApi } from '~/hooks/api/useCourseTemplateApi'
import { UpdateCourseTemplateDto, updateCourseTemplateSchema } from '~/data/course-template/update-course-template.dto'

interface UpdateCourseTemplateFormProps {
  courseTemplate: CourseTemplateDetailResponseDto | null
}

const UpdateCourseTemplateForm = ({ courseTemplate }: UpdateCourseTemplateFormProps) => {
  const { updateCourseTemplate } = useCourseTemplateApi()
  const navigate = useNavigate()

  const defaultFormValues: UpdateCourseTemplateDto = {
    title: courseTemplate?.title || '',
    description: courseTemplate?.description || '',
    price: courseTemplate?.price || 0,
    level: courseTemplate?.level || '',
    type: courseTemplate?.type || '',
    thumbnail:
      Array(
        Object.assign({ url: courseTemplate?.thumbnail, resource_type: 'image', public_id: courseTemplate?.thumbnail })
      ) || [],
    media: courseTemplate?.media || [],
    learnerLimit: courseTemplate?.learnerLimit || 0,
    lessons: courseTemplate?.lessons.map((lesson) => ({
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
    assignments: courseTemplate?.assignments.map((assignment) => ({
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
    ]
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<UpdateCourseTemplateDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(updateCourseTemplateSchema)
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

    const { data: responseData, error: apiError } = await updateCourseTemplate(courseTemplate?._id || '', {
      ...formData,
      thumbnail: formData.thumbnail[0].url,
      lessons: updatedLessons
    })

    if (apiError) {
      notifyError(apiError.message)
    }
    if (responseData?.success) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Cập nhật mẫu khóa học'))
      navigate(protectedRoute.courseTemplateDetail.path.replace(':id', courseTemplate?._id || ''))
    }
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
        Cập nhật khóa học
      </Button>
    </StyledForm>
  )
}

export default UpdateCourseTemplateForm
