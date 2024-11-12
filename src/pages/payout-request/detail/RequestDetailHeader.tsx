import { Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { RequestStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'
import { TitleWrapper } from '../PayoutRequestList.styled'

interface RequestDetailHeaderProps {
  requestStatus: RequestStatus
  onCancelButtonClick: () => void
}

const RequestDetailHeader = ({ requestStatus, onCancelButtonClick }: RequestDetailHeaderProps) => {
  const breadcrumbsItems = [protectedRoute.payoutRequestList, protectedRoute.payoutRequestDetail]

  return (
    <TitleWrapper>
      <PageHeader title='Chi tiết yêu cầu rút tiền' breadcrumbsItems={breadcrumbsItems} />
      {requestStatus === RequestStatus.PENDING && (
        <Button color='error' onClick={onCancelButtonClick}>
          Hủy yêu cầu
        </Button>
      )}
    </TitleWrapper>
  )
}

export default RequestDetailHeader
