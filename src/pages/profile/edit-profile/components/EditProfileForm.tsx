import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { HeaderWrapper, Line, StyledForm } from './EditProfileForm.styled'
import { InstructorDto } from '~/data/profile/instructor.dto'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import { useNavigate } from 'react-router-dom'
import { ControlledAvatarImageUpload } from '~/components/form/ControlledFileUpload'
import { FileFormat, FileSize } from '~/global/constants'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import ControlledAutocomplete from '~/components/form/ControlledAutocomplete'

interface bankDto {
  id: number
  name: string
  code: string
  shortName: string
}

interface EditProfileFormProps {
  instructorData: InstructorDto
  bankData: bankDto[]
}

type FormValues = {
  avatar: CloudinaryFileUploadedInfo[] | null
  bio: string
  paymentInfo: {
    bankName: string | null
    accountName: string
    accountNumber: string
  }
}

const validationSchema = z.object({
  avatar: z.array(z.object({}).passthrough()).optional(),
  bio: z.string().trim().max(200, APP_MESSAGE.FIELD_TOO_LONG('Tiểu sử', 200)).optional(),
  paymentInfo: z.object({
    bankName: z
      .string()
      .nullable()
      .refine((value) => value !== null, { message: APP_MESSAGE.REQUIRED_FIELD('Ngân hàng') }),
    accountName: z
      .string()
      .trim()
      .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên tài khoản'))
      .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên tài khoản', 50)),
    accountNumber: z
      .string()
      .trim()
      .min(1, APP_MESSAGE.REQUIRED_FIELD('Số tài khoản'))
      .max(50, APP_MESSAGE.FIELD_TOO_LONG('Số tài khoản', 50))
  })
})

const EditProfileForm = ({ instructorData, bankData }: EditProfileFormProps) => {
  const { putProfile } = useProfileApi()

  const navigate = useNavigate()

  const defaultFormValues: FormValues = {
    avatar: instructorData.avatar
      ? Array(Object.assign({ url: instructorData?.avatar, resource_type: 'image', public_id: instructorData?.avatar }))
      : null,
    bio: instructorData.bio ?? '',
    paymentInfo: {
      bankName: instructorData.paymentInfo
        ? instructorData.paymentInfo?.bankShortName + ' - ' + instructorData.paymentInfo?.bankName
        : null,
      accountName: instructorData.paymentInfo?.accountName ?? '',
      accountNumber: instructorData.paymentInfo?.accountNumber ?? ''
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, defaultValues }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const onSubmit = handleSubmit(async (formData) => {
    if (
      JSON.stringify({
        ...formData,
        avatar: formData.avatar?.length
          ? Array(
              Object.assign({ url: instructorData?.avatar, resource_type: 'image', public_id: instructorData?.avatar })
            )
          : null
      }) === JSON.stringify(defaultValues)
    ) {
      return
    }

    const bankInfo = bankData.find((bank) => bank.shortName + ' - ' + bank.name === formData.paymentInfo.bankName)

    const updatedFormData = {
      ...instructorData,
      bio: formData.bio,
      avatar: formData.avatar?.length ? formData.avatar[0].url : null,
      paymentInfo: {
        bankName: bankInfo?.name || '',
        bankShortName: bankInfo?.shortName || '',
        bankCode: bankInfo?.code || '',
        accountName: formData.paymentInfo.accountName,
        accountNumber: formData.paymentInfo.accountNumber
      }
    }

    notifyLoading()

    const { data: responseData, error: apiError } = await putProfile(updatedFormData)
    if (apiError) {
      notifyError(apiError.message)
    }
    if (responseData?.success) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Cập nhật trang cá nhân'))
      navigate('/profile')
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 1, width: '100%' }} elevation={2}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <ControlledAvatarImageUpload
              controller={{ name: 'avatar', control: control }}
              label='Avatar'
              clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
              minFile={1}
              maxFiles={1}
              maxFileSize={FileSize['5MB']}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
            <Typography variant='h6'>{instructorData.name}</Typography>
            <Typography variant='subtitle2' color={'#3c3c4399'}>
              Giảng viên
            </Typography>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'bio', control: control }}
              label='Tiểu sử'
              placeholder='Nhập tiểu sử'
              fullWidth
              multiline
              minRows={3}
              sx={{ gap: 1 }}
            />
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Thông tin TK ngân hàng
          </Typography>
          <Line />
        </HeaderWrapper>
        <Grid container columnSpacing={4} rowSpacing={'20px'}>
          <Grid item xs={6}>
            <ControlledAutocomplete
              placeholder='Chọn ngân hàng'
              controller={{ name: 'paymentInfo.bankName', control: control }}
              options={bankData.map((bank) => bank.shortName + ' - ' + bank.name)}
              label='Ngân hàng'
            />
          </Grid>
        </Grid>
        <Grid container columnSpacing={4} rowSpacing={'20px'}>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'paymentInfo.accountName', control: control }}
              label='Tên tài khoản'
              placeholder='Nhập tên tài khoản'
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'paymentInfo.accountNumber', control: control }}
              label='Số tài khoản'
              placeholder='Nhập số tài khoản'
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Lưu
      </Button>
    </StyledForm>
  )
}

export default EditProfileForm
