import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClassRequestListItemResponseDto } from '~/data/class-request/request.dto'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { notifyInfo } from '~/utils/toastify'
import RequestDetailHeader from './components/RequestDetailHeader'
import Loading from '~/components/loading/Loading'
import CancelRequestConfirmation from './components/CancelRequestConfirmation'
import RequestDetailInformation from './components/RequestDetailInformation'
import { StyledContainer } from './ClassRequestDetail.styled'
import ClassDetailInformation from './components/ClassDetailInformation'
import CourseDetailInformation from './components/CourseDetailInformation'
import SessionDetail from './components/SessionDetail'

const ClassRequestDetail = () => {
  const params = useParams()
  const classRequestId = params.id
  const { getClassRequestById } = useRequestApi()
  const [data, setData] = useState<ClassRequestListItemResponseDto | null>(null)
  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: classRequest, error: apiError } = await getClassRequestById(classRequestId!)

      setData(classRequest)

      if (apiError) {
        notifyInfo(apiError.message)
      }
    })()
  }, [classRequestId, getClassRequestById])

  const handleOpenCancelConfirmation = () => {
    setOpenCancelConfirmation(true)
  }

  const handleCloseCancelConfirmation = () => {
    setOpenCancelConfirmation(false)
  }

  const handleReloadData = async () => {
    const { data: classRequest, error: apiError } = await getClassRequestById(classRequestId!)

    setData(classRequest)

    if (apiError) {
      notifyInfo(apiError.message)
    }
  }

  return data ? (
    <StyledContainer>
      <RequestDetailHeader requestStatus={data.status} onCancelButtonClick={handleOpenCancelConfirmation} />
      <RequestDetailInformation request={data} />
      <ClassDetailInformation request={data} />
      <CourseDetailInformation request={data} />
      <SessionDetail request={data} />

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

export default ClassRequestDetail
