import PageHeader from '~/components/header/PageHeader'
import { TitleWrapper } from './PayoutRequestList.styled'
import PayoutRequestTable from './components/PayoutRequestTable'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { protectedRoute } from '~/routes/routes'
import { Add } from '@mui/icons-material'

const PayoutRequestList = () => {
  return (
    <>
      <TitleWrapper>
        <PageHeader title='Yêu cầu rút tiền' />
        <Button color='secondary' component={Link} to={protectedRoute.createPayoutRequest.path} endIcon={<Add />}>
          Tạo yêu cầu
        </Button>
      </TitleWrapper>
      <PayoutRequestTable />
    </>
  )
}

export default PayoutRequestList
