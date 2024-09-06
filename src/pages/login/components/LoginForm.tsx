import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { StyledForm } from './LoginForm.styled'
import { PrimaryButton } from '~/components/button/Button.styled'
import useAuth from '~/auth/useAuth'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { useState } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
    .email('Email không hợp lệ')
    .min(1, 'Email không được bỏ trống')
    .max(50, { message: 'Tối đa 50 ký tự' }),
  password: z.string().min(1, 'Mật khẩu không được bỏ trống').max(50, { message: 'Tối đa 50 ký tự' })
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
      notifySuccess('Đăng nhập thành công')
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
      <PrimaryButton disabled={isSubmitting} variant='contained' type='submit' fullWidth sx={{ marginTop: '0.7rem' }}>
        Đăng nhập
      </PrimaryButton>
    </StyledForm>
  )
}

export default LoginForm
