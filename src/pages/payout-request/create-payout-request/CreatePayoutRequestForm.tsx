import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { HeaderWrapper, Line, StyledForm } from './CreatePayoutRequestForm.styled'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { formatCurrency } from '~/utils/format'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import PageHeader from '~/components/header/PageHeader'
import { useEffect, useState } from 'react'
import { useProfileApi } from '~/hooks/api/useProfileApi'

interface CreatePayoutRequestDto {
  amount: number
  description: string
}

const CreatePayoutRequestForm = () => {
  const { createPayoutRequest } = useRequestApi()
  const { getProfile } = useProfileApi()
  const navigate = useNavigate()
  const [maxAmount, setMaxAmount] = useState<number>(0)

  const defaultFormValues: CreatePayoutRequestDto = {
    amount: 0,
    description: ''
  }

  const createPayoutRequestSchema = z.object({
    amount: z.coerce
      .number({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
      .int({ message: APP_MESSAGE.INVALID_VALUE(['số nguyên']) })
      .min(200000, APP_MESSAGE.VALUE_OUT_OF_RANGE(formatCurrency(200000), formatCurrency(50000000)))
      .max(50000000, APP_MESSAGE.VALUE_OUT_OF_RANGE(formatCurrency(200000), formatCurrency(50000000)))
      .max(maxAmount, APP_MESSAGE.AMOUNT_OVER_BALANCE),
    description: z
      .string()
      .trim()
      .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả yêu cầu'))
      .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả yêu cầu', 500))
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<CreatePayoutRequestDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createPayoutRequestSchema)
  })

  const onSubmit = handleSubmit(async (formData) => {
    notifyLoading()

    const { data, error } = await createPayoutRequest(formData)

    if (error) {
      notifyError(error.message)
      return
    }

    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Gửi yêu cầu rút tiền'))
      navigate(protectedRoute.payoutRequestList.path)
    }
  })

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getProfile()

      if (error) {
        notifyError(error.message)
        navigate(protectedRoute.payoutRequestList.path)
        return
      }

      if (data) {
        if (!data.paymentInfo) {
          navigate(protectedRoute.payoutRequestList.path, { replace: true })
          notifyError(APP_MESSAGE.NO_PAYMENT_INFO)
        }
        setMaxAmount(data.balance)
      }
    })()
  }, [getProfile, navigate])

  return (
    <>
      <PageHeader
        title='Tạo yêu cầu rút tiền'
        breadcrumbsItems={[protectedRoute.payoutRequestList, protectedRoute.createPayoutRequest]}
      />
      <StyledForm onSubmit={onSubmit}>
        <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
          <HeaderWrapper>
            <Typography variant='h5' fontWeight={'bold'}>
              Thông tin yêu cầu
            </Typography>
            <Line />
          </HeaderWrapper>
          <Typography variant='caption'>*Tối đa 5 yêu cầu trong ngày</Typography>
          <Grid container columnSpacing={4} rowSpacing={'20px'}>
            <Grid item xs={12}>
              <ControlledOutlinedInput
                size='small'
                controller={{ name: 'description', control: control }}
                label='Mô tả yêu cầu'
                placeholder='Nhập mô tả yêu cầu'
                multiline
                minRows={4}
                fullWidth
                sx={{ gap: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledOutlinedInput
                size='small'
                controller={{ name: 'amount', control: control }}
                description={`Số tiền tối thiểu mỗi lần rút là ${formatCurrency(200000)} và hạn mức ${formatCurrency(50000000)} trong ngày`}
                label='Số tiền'
                placeholder='Nhập số tiền'
                inputMode='numeric'
                fullWidth
                sx={{ gap: 1 }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Button
          sx={{ maxWidth: 'fit-content' }}
          disabled={isSubmitting || Object.keys(errors).length > 0}
          type='submit'
        >
          Gửi yêu cầu
        </Button>
      </StyledForm>
    </>
  )
}

export default CreatePayoutRequestForm
