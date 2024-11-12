import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { protectedRoute } from '~/routes/routes'
import { StyledContainer } from './PayoutRequestDetail.styled'
import RequestDetailHeader from './RequestDetailHeader'
import CancelRequestConfirmation from './CancelRequestConfirmation'
import { PayoutRequestDetailResponseDto } from '~/data/payout-request/payout-request.dto'
import RequestDetailInformation from './RequestDetailInformation'

const PayoutRequestDetail = () => {
  const params = useParams()
  const payoutRequestId = params.id
  const { getPayoutRequestById } = useRequestApi()
  const navigate = useNavigate()
  const [data, setData] = useState<PayoutRequestDetailResponseDto | null>(null)
  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false)

  useEffect(() => {
    if (payoutRequestId) {
      ;(async () => {
        const { data: payoutRequest, error: apiError } = await getPayoutRequestById(payoutRequestId!)
        setData(payoutRequest)

        if (apiError) {
          notifyError(apiError.message)
          navigate(protectedRoute.payoutRequestList.path, { replace: true })
        }
      })()
    }
  }, [payoutRequestId, getPayoutRequestById, navigate])

  const handleOpenCancelConfirmation = () => {
    setOpenCancelConfirmation(true)
  }

  const handleCloseCancelConfirmation = () => {
    setOpenCancelConfirmation(false)
  }

  const handleReloadData = async () => {
    const { data: payoutRequest, error: apiError } = await getPayoutRequestById(payoutRequestId!)

    setData(payoutRequest)

    if (apiError) {
      notifyError(apiError.message)
    }
  }

  return data ? (
    <StyledContainer>
      <RequestDetailHeader requestStatus={data.status} onCancelButtonClick={handleOpenCancelConfirmation} />
      <RequestDetailInformation request={data} />
      {/*<ClassDetailInformation request={data} />
      <CourseDetailInformation request={data} />
      <SessionDetail request={data} /> */}

      <CancelRequestConfirmation
        requestId={data._id}
        open={openCancelConfirmation}
        handleClose={handleCloseCancelConfirmation}
        onSuccess={handleReloadData}
      />
    </StyledContainer>
  ) : (
    <Loading />
  )
}

export default PayoutRequestDetail
