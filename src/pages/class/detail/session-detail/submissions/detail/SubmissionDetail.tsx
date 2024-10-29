import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { SubmissionDto } from '~/data/class/class.dto'
import { LearnerStatus, SubmissionStatus } from '~/global/constants'
import SubmissionDetailInformation from './components/SubmissionDetailInformation'
import SubmissionDetailHeader from './components/SubmissionDetailHeader'
import GradeAssignmentDialog from './components/GradeAssignmentDialog'
import { useState } from 'react'

const SubmissionDetail = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId
  const [openGradeAssignmentDialog, setOpenGradeAssignmentDialog] = useState(false)

  const handleOpenGradeAssignmentDialog = () => {
    setOpenGradeAssignmentDialog(true)
  }

  const handleCloseGradeAssignmentDialog = () => {
    setOpenGradeAssignmentDialog(false)
  }

  const handleReloadData = async () => {
    console.log('handleReloadData')
    // setData(submission)

    // if (apiError) {
    //   notifyInfo(apiError.message)
    // }
  }

  const submissions: SubmissionDto[] = [
    {
      _id: 'sub1',
      attachment: {
        asset_id: 'asset1',
        public_id: 'public1',
        format: 'jpg',
        resource_type: 'image',
        created_at: '2024-10-01T10:00:00Z',
        type: 'upload',
        url: 'https://res.cloudinary.com/orchidify/image/upload/v1729687639/qtl8ze5om09vbafkybmv.jpg',
        asset_folder: 'folder1',
        original_filename: 'submission1',
        original_extension: 'jpg'
      },
      point: 8,
      feedback: 'Well done, but room for improvement.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam1', name: 'Dr. Smith' },
      assignments: [],
      learner: {
        _id: 'learner1',
        email: 'learner1@example.com',
        name: 'Alice',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687639/qtl8ze5om09vbafkybmv.jpg',
        dateOfBirth: '2000-01-01',
        phone: '1234567890',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-01-01T12:00:00Z',
        updatedAt: '2023-06-01T12:00:00Z'
      },
      createdAt: new Date('2024-10-01T10:00:00Z'),
      updatedAt: new Date('2024-10-02T12:00:00Z')
    },
    {
      _id: 'sub2',
      // attachment: {
      //   asset_id: 'asset2',
      //   public_id: 'public2',
      //   format: 'pdf',
      //   resource_type: 'image',
      //   created_at: '2024-10-02T09:00:00Z',
      //   type: 'upload',
      //   url: 'https://example.com/file2.pdf',
      //   asset_folder: 'folder2',
      //   original_filename: 'submission2',
      //   original_extension: 'pdf'
      // },
      // point: 7,
      // feedback: 'Good effort. Focus on clarity.',
      status: SubmissionStatus.NOT_YET,
      examiner: { _id: 'exam2', name: 'Ms. Taylor' },
      assignments: [],
      learner: {
        _id: 'learner2',
        email: 'learner2@example.com',
        name: 'Bob',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687591/ahq6bzdi3chtirol8guf.jpg',
        dateOfBirth: '1999-05-15',
        phone: '0987654321',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-02-01T10:00:00Z',
        updatedAt: '2023-07-01T11:00:00Z'
      }
      // createdAt: new Date('2024-10-02T09:00:00Z'),
      // updatedAt: new Date('2024-10-03T10:30:00Z')
    },
    {
      _id: 'sub3',
      attachment: {
        asset_id: 'asset3',
        public_id: 'public3',
        format: 'pdf',
        resource_type: 'video',
        created_at: '2024-10-03T08:30:00Z',
        type: 'authenticated',
        url: 'https://res.cloudinary.com/orchidify/image/upload/v1729687963/jln13nxr5lbzqgqcz1rg.pdf',
        asset_folder: 'folder3',
        original_filename: 'submission3',
        original_extension: 'pdf'
      },
      // point: 9,
      // feedback: 'Excellent work.',
      status: SubmissionStatus.SUBMITTED,
      examiner: { _id: 'exam3', name: 'Dr. Green' },
      assignments: [],
      learner: {
        _id: 'learner3',
        email: 'learner3@example.com',
        name: 'Carol',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '1998-03-22',
        phone: '0123456789',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-03-01T09:30:00Z',
        updatedAt: '2023-08-01T12:00:00Z'
      },
      createdAt: new Date('2024-10-03T08:30:00Z'),
      updatedAt: new Date('2024-10-03T08:30:00Z')
    }
  ]

  const data = submissions[2]

  return data ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <SubmissionDetailHeader classId={classId!} sessionId={sessionId!} />
      <SubmissionDetailInformation submission={data} />
      {data.status === SubmissionStatus.SUBMITTED && (
        <Button sx={{ maxWidth: 'fit-content', mx: 'auto' }} onClick={handleOpenGradeAssignmentDialog}>
          Chấm điểm
        </Button>
      )}

      <GradeAssignmentDialog
        submissionId={data._id}
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
