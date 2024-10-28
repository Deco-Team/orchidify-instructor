import { InsertDriveFileOutlined } from '@mui/icons-material'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import PageHeader from '~/components/header/PageHeader'
import Loading from '~/components/loading/Loading'
import SubmissionStatusTag from '~/components/tag/SubmissionStatusTag'
import { SubmissionDto } from '~/data/class/class.dto'
import { LearnerStatus, SubmissionStatus } from '~/global/constants'
import { protectedRoute } from '~/routes/routes'

interface FieldProps {
  label: string
  content?: string
  status?: SubmissionStatus
}

const Field: React.FC<FieldProps> = ({ label, content, status }) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
    {status && <SubmissionStatusTag type={status} />}
  </Box>
)

const SubmissionDetail = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId

  const breadcrumbsItems = [
    protectedRoute.classList,
    {
      ...protectedRoute.classDetail,
      path: protectedRoute.classDetail.path.replace(':id', classId!)
    },
    {
      ...protectedRoute.classSessionDetail,
      path: protectedRoute.classSessionDetail.path.replace(':classId', classId!).replace(':sessionId', sessionId!)
    },
    {
      ...protectedRoute.classSubmissionList,
      path: protectedRoute.classSubmissionList.path.replace(':classId', classId!).replace(':sessionId', sessionId!)
    },
    protectedRoute.classSubmissionDetail
  ]

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
      <PageHeader title='Chi tiết bài làm' breadcrumbsItems={breadcrumbsItems} />
      <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2.5 }} elevation={2}>
        <Box display='flex' alignItems='center'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
            Chi tiết bài làm
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Box display='flex' gap='1rem'>
          <Box width='250px' height='250px'>
            <img
              src={'https://res.cloudinary.com/orchidify/image/upload/v1729687639/qtl8ze5om09vbafkybmv.jpg'}
              alt={'classDetail.title'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
            />
          </Box>
          <Box display='flex' flexDirection='column' gap={1} flexGrow='1'>
            <Field label='Tên học viên' content={data.learner.name} />
            {data.status !== SubmissionStatus.NOT_YET && (
              <>
                <Field
                  label='Thời gian nộp'
                  content={data.createdAt ? new Date(data.createdAt).toLocaleString('vi-VN') : 'N/A'}
                />

                <Field
                  label='Cập nhật cuối'
                  content={data.updatedAt ? new Date(data.updatedAt).toLocaleString('vi-VN') : 'N/A'}
                />
              </>
            )}
            <Field label='Trạng thái' status={data.status} />
          </Box>
        </Box>
        {data.status !== SubmissionStatus.NOT_YET && (
          <>
            <Field label='Giảng viên' content={data.examiner ? data.examiner.name : ''} />
            <Field label='Điểm' content={data.point !== undefined ? data.point.toString() : ''} />
            <Box>
              <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
                Nhận xét
              </Typography>
              <Typography variant='subtitle1' fontWeight={400} minHeight={28}>
                {data.feedback}
              </Typography>
            </Box>

            <Box>
              <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
                Bài làm
              </Typography>
              <div
                style={{
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ width: '100%', height: '100%', padding: '0 2px' }}>
                  {data.attachment && data.attachment.resource_type === 'image' && data.attachment.format !== 'pdf' ? (
                    <img
                      src={data.attachment.url}
                      alt={`Lesson resource ${data.attachment.public_id}`}
                      style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => data.attachment && window.open(data.attachment.url, '_blank')}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        background: '#f4f4f4',
                        width: '250px',
                        p: 2.5,
                        borderRadius: 2,
                        border: '2px solid #d7d7d7',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => data.attachment && window.open(data.attachment.url, '_blank')}
                    >
                      <InsertDriveFileOutlined />
                      {data.attachment && (
                        <Typography
                          variant='subtitle1'
                          sx={{
                            width: '100%',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                          }}
                        >
                          {data.attachment.public_id}
                        </Typography>
                      )}
                    </Box>
                  )}
                </div>
              </div>
            </Box>
          </>
        )}
      </Paper>
      <Button sx={{ maxWidth: 'fit-content', mx: 'auto' }}>Chấm điểm </Button>
    </Box>
  ) : (
    <Loading />
  )
}

export default SubmissionDetail
