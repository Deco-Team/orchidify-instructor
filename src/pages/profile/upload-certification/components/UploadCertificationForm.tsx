import { Box, Button, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { HeaderWrapper, Line, StyledForm } from './UploadCertificationForm.styled'
import { useForm } from 'react-hook-form'
import { InstructorCertificationDto } from '~/data/profile/instructor.dto'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { APP_MESSAGE } from '~/global/app-message'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { ControlledFileFieldUpload } from '~/components/form/ControlledFileUpload'
import { FileFormat, FileSize } from '~/global/constants'
import Table from '~/components/table/Table'
import { Delete } from '@mui/icons-material'
import { certificationColumns } from './certification-columns'
import { useState, useEffect } from 'react'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useNavigate } from 'react-router-dom'

interface UploadCertificationFormProps {
  certificationdata: InstructorCertificationDto[]
}

interface UploadCertificationDto {
  name: string
  url: CloudinaryFileUploadedInfo[]
}

const UploadCertificationForm = ({ certificationdata }: UploadCertificationFormProps) => {
  const [certifications, setCertifications] = useState(certificationdata)
  const navigate = useNavigate()

  const { putProfile } = useProfileApi()

  const defaultFormValues: UploadCertificationDto = {
    name: '',
    url: []
  }

  const uploadCertificationSchema = z.object({
    name: z.string().trim().max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên chứng chỉ', 50)),
    url: z.array(z.object({}).passthrough())
  })

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    clearErrors,
    setError,
    formState: { isSubmitting, errors }
  } = useForm<UploadCertificationDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(uploadCertificationSchema)
  })

  const formValues = watch()

  useEffect(() => {
    if (formValues.name.trim() === '' && formValues.url.length !== 0) {
      trigger()

      setError('name', {
        type: 'required',
        message: APP_MESSAGE.REQUIRED_FIELD('Tên chứng chỉ')
      })
    } else if (formValues.name.trim() !== '' && formValues.url.length === 0) {
      trigger()

      setError('url', {
        type: 'required',
        message: APP_MESSAGE.REQUIRED_FIELD('File hoặc ảnh')
      })
    } else {
      clearErrors()
      trigger()
    }
  }, [clearErrors, formValues.name, formValues.url, setError, trigger])

  const onSubmit = handleSubmit(async (formData) => {
    const submittedCertification = [...certifications]

    if (
      (formData.name.trim() === '' && formData.url.length !== 0) ||
      (formData.name.trim() !== '' && formData.url.length === 0)
    ) {
      return
    } else if (formData.name.trim() !== '' && formData.url.length !== 0) {
      submittedCertification.push({ name: formData.name, url: formData.url[0].url })
    }

    if (JSON.stringify(certificationdata) === JSON.stringify(submittedCertification)) {
      return
    }

    notifyLoading()
    const { data, error } = await putProfile({ certificates: submittedCertification })

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Cập nhật chứng chỉ'))
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
            Thông tin chứng chỉ
          </Typography>
          <Line />
        </HeaderWrapper>
        <Grid container columnSpacing={4} rowSpacing={'20px'}>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: `name`, control }}
              label='Tên chứng chỉ'
              placeholder='Nhập tên chứng chỉ'
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledFileFieldUpload
              controller={{ name: `url`, control }}
              label='File hoặc ảnh'
              clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png, FileFormat.pdf]}
              minFile={1}
              maxFiles={1}
              maxFileSize={FileSize['5MB']}
            />
          </Grid>
        </Grid>
      </Paper>

      {certificationdata.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Table
            title='Danh sách chứng chỉ'
            tableOptions={{
              columns: certificationColumns,
              data: certifications.filter((cert) => cert.name !== ''),
              rowCount: certifications.length,
              enableBottomToolbar: false,
              enableSorting: false,
              enableColumnFilters: false,
              enableHiding: false,
              enableColumnActions: false,
              enableRowActions: true,
              positionActionsColumn: 'last',
              displayColumnDefOptions: {
                'mrt-row-actions': {
                  header: '',
                  grow: false,
                  size: 70,
                  muiTableBodyCellProps: {
                    align: 'center'
                  }
                }
              },
              renderRowActions: (props) => (
                <Tooltip title='Xóa'>
                  <IconButton
                    onClick={() => {
                      setCertifications(
                        certifications.slice(0, props.row.index).concat(certifications.slice(props.row.index + 1))
                      )
                    }}
                  >
                    <Delete sx={{ color: '#000000dd' }} />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Box>
      )}
      <Button
        sx={{ maxWidth: 'fit-content', mt: 2.5 }}
        disabled={isSubmitting || Object.keys(errors).length > 0}
        type='submit'
      >
        Lưu
      </Button>
    </StyledForm>
  )
}

export default UploadCertificationForm
