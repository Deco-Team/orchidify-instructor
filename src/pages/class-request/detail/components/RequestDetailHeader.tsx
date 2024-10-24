import { Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { RequestStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'
import { TitleWrapper } from '../ClassRequestDetail.styled'

interface RequestDetailHeaderProps {
  requestStatus: RequestStatus
  onCancelButtonClick: () => void
}

const RequestDetailHeader = ({ requestStatus, onCancelButtonClick }: RequestDetailHeaderProps) => {
  const breadcrumbsItems = [protectedRoute.classRequestList, protectedRoute.classRequestDetail]

  return (
    <TitleWrapper>
      <PageHeader title='Chi tiết yêu cầu lớp học' breadcrumbsItems={breadcrumbsItems} />
      {requestStatus === RequestStatus.PENDING && (
        <Button color='error' onClick={onCancelButtonClick}>
          Hủy yêu cầu
        </Button>
      )}
    </TitleWrapper>
  )
}

export default RequestDetailHeader
