import PageHeader from '~/components/header/PageHeader'
import { TitleWrapper } from './PayoutRequestList.styled'
import PayoutRequestTable from './components/PayoutRequestTable'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { protectedRoute } from '~/routes/routes'
import { Add } from '@mui/icons-material'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import { InstructorDto } from '~/data/profile/instructor.dto'
import { formatCurrency } from '~/utils/format'
import Loading from '~/components/loading/Loading'

const PayoutRequestList = () => {
  const { getProfile } = useProfileApi()
  const [data, setData] = useState<InstructorDto | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getProfile()
      if (data) {
        setData(data)
      }

      if (error) {
        notifyError(error.message)
        return
      }
    })()
  }, [getProfile])

  return data ? (
    <>
      <TitleWrapper>
        <PageHeader title='Yêu cầu rút tiền' />
        <Box sx={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Typography variant='body1' color='warning' fontStyle={'italic'}>
            Số dư: {formatCurrency(data?.balance || 0)}
          </Typography>
          <Button
            disabled={data?.balance === 0}
            color='secondary'
            component={Link}
            to={protectedRoute.createPayoutRequest.path}
            endIcon={<Add />}
          >
            Tạo yêu cầu
          </Button>
        </Box>
      </TitleWrapper>
      <PayoutRequestTable />
    </>
  ) : (
    <Loading />
  )
}

export default PayoutRequestList
