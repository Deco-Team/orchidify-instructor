import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { Avatar, FieldWrapper, HeaderWrapper, Line, StyledForm } from './EditProfileForm.styled'
import { InstructorDto } from '~/data/profile/instructor.dto'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { useState } from 'react'
import { APP_MESSAGE } from '~/global/app-message'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import { useNavigate } from 'react-router-dom'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

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
  avatar: string | null
  bio: string
  paymentInfo: {
    bankName: string
    bankShortName: string
    bankCode: string
    accountName: string
    accountNumber: string
  }
}

const validationSchema = z.object({
  avatar: z.string().trim().nullable(),
  bio: z.string().max(50, APP_MESSAGE.FIELD_TOO_LONG('Tiểu sử', 200)).trim(),
  paymentInfo: z.object({
    bankName: z.string(),
    bankShortName: z.string(),
    bankCode: z.string(),
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
  const { uploadCloudinary } = useCloudinaryApi()

  const navigate = useNavigate()

  const [previewURL, setPreviewURL] = useState<string | null>(instructorData.avatar)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState(false)

  const [selectedBank, setSelectedBank] = useState<string | null>(
    instructorData.paymentInfo.bankShortName
      ? instructorData.paymentInfo.bankShortName + ' - ' + instructorData.paymentInfo.bankName
      : null
  )
  const [bankError, setBankError] = useState(false)

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      setFile(null)
      setPreviewURL('')
      event.target.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE || !ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFile(null)
      setPreviewURL('')
      event.target.value = ''
      setFileError(true)
      return
    }

    setFile(file)
    const url = URL.createObjectURL(file)
    setPreviewURL(url)

    setFileError(false)
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: string) => option
  })

  const defaultFormValues: FormValues = {
    avatar: instructorData.avatar,
    bio: instructorData.bio,
    paymentInfo: {
      bankName: instructorData.paymentInfo.bankName,
      bankShortName: instructorData.paymentInfo.bankShortName,
      bankCode: instructorData.paymentInfo.bankCode,
      accountName: instructorData.paymentInfo.accountName,
      accountNumber: instructorData.paymentInfo.accountNumber
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isSubmitted, defaultValues }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const onSubmit = handleSubmit(async (formData) => {
    if (selectedBank === null) {
      setBankError(true)
      return
    } else {
      bankData.forEach((bank) => {
        if (selectedBank === bank.shortName + ' - ' + bank.name) {
          formData.paymentInfo.bankName = bank.name
          formData.paymentInfo.bankShortName = bank.shortName
          formData.paymentInfo.bankCode = bank.code
        }
      })
    }

    if (!previewURL) {
      formData.avatar = null
    }

    if (previewURL !== instructorData.avatar) {
      if (file) {
        const response = await uploadCloudinary([file])
        if (!response) {
          notifyError(APP_MESSAGE.ACTION_DID_FAILED('Upload ảnh'))
          return
        } else {
          formData.avatar = response.url
        }
      }
    }

    if (JSON.stringify(formData) === JSON.stringify(defaultValues)) {
      return
    }

    notifyLoading()

    const { data: responseData, error: apiError } = await putProfile(formData as InstructorDto)
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
            <Avatar src={previewURL ?? ''} alt='avatar' variant='circular' />
            <Button sx={{ maxWidth: 'fit-content' }} onClick={handleUploadClick} disabled={isSubmitting}>
              {previewURL ? 'Thay đổi' : 'Tải lên'}
            </Button>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              accept='image/png, image/jpeg, image/jpg'
              onChange={handleFileChange}
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
        {fileError && (
          <FormHelperText error>{APP_MESSAGE.INVALID_FILE_FORMAT_OR_SIZE('png, jpg, jpeg', '5MB')}</FormHelperText>
        )}
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
            <FieldWrapper>
              <Typography variant='body1'>Ngân hàng</Typography>
              <Autocomplete
                disablePortal
                size='small'
                value={selectedBank}
                noOptionsText={APP_MESSAGE.THERE_IS_NO_SEARCH_RESULT}
                onChange={(_event, newValue) => {
                  setSelectedBank(newValue)
                  if (newValue === null && isSubmitted) {
                    setBankError(true)
                  } else {
                    setBankError(false)
                  }
                }}
                options={bankData.map((bank) => bank.shortName + ' - ' + bank.name)}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} placeholder='Chọn ngân hàng' error={bankError} />}
              />
            </FieldWrapper>
            {bankError && (
              <FormHelperText sx={{ maxWidth: '160px' }} error>
                {APP_MESSAGE.REQUIRED_FIELD('Ngân hàng')}
              </FormHelperText>
            )}
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

      <Button
        sx={{ maxWidth: 'fit-content' }}
        disabled={isSubmitting || bankError || Object.keys(errors).length > 0}
        type='submit'
      >
        Lưu
      </Button>
    </StyledForm>
  )
}

export default EditProfileForm
