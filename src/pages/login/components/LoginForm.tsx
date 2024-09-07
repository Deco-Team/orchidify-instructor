import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { StyledForm } from './LoginForm.styled'
import useAuth from '~/auth/useAuth'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { useState } from 'react'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { APP_MESSAGE } from '~/global/app-message'

type FormValues = {
  email: string
  password: string
}

const defaultFormValues: FormValues = {
  email: '',
  password: ''
}

const validationSchema = z.object({
  email: z
    .string()
    .email(APP_MESSAGE.WRONG_EMAIL_FORMAT)
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Email'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Email', 50)),
  password: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Mật khẩu'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Mật khẩu', 50))
})

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })
  const { login } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const error = await login(data.email, data.password)

    if (error) {
      notifyError(error.message)
    } else {
      notifySuccess(APP_MESSAGE.LOGIN_SUCCESS)
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <ControlledOutlinedInput
        controller={{ name: 'email', control: control }}
        label='Email'
        placeholder='Nhập địa chỉ email'
        fullWidth
        sx={{ marginBottom: '0.7rem' }}
      />
      <ControlledOutlinedInput
        controller={{ name: 'password', control: control }}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label='Mật khẩu'
        placeholder='Nhập mật khẩu'
        fullWidth
        sx={{ marginBottom: '0.7rem' }}
      />
      <Button disabled={isSubmitting} size='large' type='submit' fullWidth sx={{ marginTop: '0.7rem' }}>
        Đăng nhập
      </Button>
    </StyledForm>
  )
}

export default LoginForm
