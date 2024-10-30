import { InsertDriveFileOutlined } from '@mui/icons-material'
import { Box, Divider, Paper, Typography } from '@mui/material'
import SubmissionStatusTag from '~/components/tag/SubmissionStatusTag'
import { BaseAssignmentSubmissionDto } from '~/data/class/class.dto'
import { SubmissionStatus } from '~/global/constants'

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

interface SubmissionInfoProps {
  submission: BaseAssignmentSubmissionDto
}

const SubmissionDetailInformation = ({ submission }: SubmissionInfoProps) => {
  return (
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
            src={submission.learner.avatar}
            alt={submission.learner.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <Box display='flex' flexDirection='column' gap={1} flexGrow='1'>
          <Field label='Tên học viên' content={submission.learner.name} />
          <Field label='Thời gian nộp' content={new Date(submission.createdAt).toLocaleString('vi-vn')} />
          <Field label='Cập nhật cuối' content={new Date(submission.updatedAt).toLocaleString('vi-vn')} />
          <Field label='Trạng thái' status={submission.status} />
        </Box>
      </Box>

      <Field label='Điểm' content={submission.point ? submission.point.toString() : ''} />
      <Box>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Nhận xét
        </Typography>
        <Typography variant='subtitle1' fontWeight={400} minHeight={28}>
          {submission.feedback}
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
            {submission.attachments[0].resource_type === 'image' && submission.attachments[0].format !== 'pdf' ? (
              <img
                src={submission.attachments[0].url}
                alt={`Lesson resource ${submission.attachments[0].public_id}`}
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => window.open(submission.attachments[0].url, '_blank')}
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
                onClick={() => window.open(submission.attachments[0].url, '_blank')}
              >
                <InsertDriveFileOutlined />

                <Typography
                  variant='subtitle1'
                  sx={{
                    width: '100%',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}
                >
                  {submission.attachments[0].public_id}
                </Typography>
              </Box>
            )}
          </div>
        </div>
      </Box>
    </Paper>
  )
}

export default SubmissionDetailInformation
