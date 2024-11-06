import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ControlledFileAreaUpload } from '~/components/form/ControlledFileUpload'
import { BaseMediaDto } from '~/data/common.dto'
import { SessionDto } from '~/data/course/course.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { FileFormat, FileSize } from '~/global/constants'
import { useClassApi } from '~/hooks/api/useClassApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface UploadResourcesProps {
  classId: string
  sessionId: string
  data: SessionDto
}

interface UploadResourcesDto {
  mediaVideo: BaseMediaDto[]
  mediaImages: BaseMediaDto[]
}

const uploadResourcesSchema = z.object({
  mediaVideo: z.array(z.object({}).passthrough()),
  mediaImages: z.array(z.object({}).passthrough())
})

const UploadResourcesForm = ({ classId, sessionId, data }: UploadResourcesProps) => {
  const navigate = useNavigate()
  const { uploadResourses } = useClassApi()

  const defaultFormValues: UploadResourcesDto = {
    mediaVideo: data.media.filter((media) => media.resource_type === 'video' && media.isAddedLater) || [],
    mediaImages: data.media.filter((media) => media.resource_type === 'image' && media.isAddedLater) || []
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<UploadResourcesDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(uploadResourcesSchema)
  })

  const onSubmit = handleSubmit(async (formData) => {
    if (JSON.stringify(formData) === JSON.stringify(defaultFormValues)) return

    const media = [...formData.mediaVideo, ...formData.mediaImages]
    const { data, error } = await uploadResourses(classId!, sessionId!, media)

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Tải lên tài nguyên'))
      navigate(-1)
    }

    if (error) {
      notifyError(error.message)
    }
  })

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <Grid container columnSpacing={4} rowSpacing={'20px'}>
        <Grid item xs={6}>
          <ControlledFileAreaUpload
            controller={{ name: `mediaVideo`, control: control }}
            label='Video bài học'
            clientAllowedFormats={[FileFormat.video]}
            minFile={1}
            maxFiles={1}
            maxFileSize={FileSize['100MB']}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledFileAreaUpload
            controller={{ name: 'mediaImages', control: control }}
            label='Hình ảnh bài học'
            clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
            minFile={1}
            maxFiles={2}
            multiple
            maxFileSize={FileSize['5MB']}
          />
        </Grid>
      </Grid>

      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Lưu
      </Button>
    </form>
  )
}

export default UploadResourcesForm
