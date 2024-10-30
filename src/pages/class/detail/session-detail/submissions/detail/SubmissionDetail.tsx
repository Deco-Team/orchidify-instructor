import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { BaseAssignmentSubmissionDto } from '~/data/class/class.dto'
import { SubmissionStatus } from '~/global/constants'
import SubmissionDetailInformation from './components/SubmissionDetailInformation'
import SubmissionDetailHeader from './components/SubmissionDetailHeader'
import GradeAssignmentDialog from './components/GradeAssignmentDialog'
import { useEffect, useState } from 'react'
import { useClassApi } from '~/hooks/api/useClassApi'
import { notifyError } from '~/utils/toastify'

const SubmissionDetail = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId
  const assignmentId = params.assignmentId
  const submissionId = params.submissionId

  const [openGradeAssignmentDialog, setOpenGradeAssignmentDialog] = useState(false)
  const { getSubmissionById } = useClassApi()
  const [data, setData] = useState<BaseAssignmentSubmissionDto | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: submission, error: apiError } = await getSubmissionById(classId!, submissionId!)

      setData(submission)

      if (apiError) {
        notifyError(apiError.message)
      }
    })()
  }, [getSubmissionById, classId, submissionId])

  const handleOpenGradeAssignmentDialog = () => {
    setOpenGradeAssignmentDialog(true)
  }

  const handleCloseGradeAssignmentDialog = () => {
    setOpenGradeAssignmentDialog(false)
  }

  const handleReloadData = async () => {
    const { data: submission, error: apiError } = await getSubmissionById(classId!, submissionId!)

    setData(submission)

    if (apiError) {
      notifyError(apiError.message)
    }
  }

  return data ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <SubmissionDetailHeader classId={classId!} sessionId={sessionId!} assignmentId={assignmentId!} />
      <SubmissionDetailInformation submission={data} />
      {data.status === SubmissionStatus.SUBMITTED && (
        <Button sx={{ maxWidth: 'fit-content', mx: 'auto' }} onClick={handleOpenGradeAssignmentDialog}>
          Chấm điểm
        </Button>
      )}

      <GradeAssignmentDialog
        classId={classId!}
        submissionId={submissionId!}
        open={openGradeAssignmentDialog}
        handleClose={handleCloseGradeAssignmentDialog}
        onSuccess={handleReloadData}
      />
    </Box>
  ) : (
    <Loading />
  )
}

export default SubmissionDetail
