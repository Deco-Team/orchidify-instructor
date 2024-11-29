import { Paper, Box, Typography, Divider, Avatar } from '@mui/material'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'

interface FieldProps {
  label: string
  content: string
}

const Field: React.FC<FieldProps> = ({ label, content }) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}:
    </Typography>
    <Typography variant='subtitle1' fontWeight={400}>
      {content}
    </Typography>
  </Box>
)

interface InformationProps {
  learner: LearnerDetailResponseDto
}

const Information = ({ learner }: InformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin học viên
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' gap='1rem' marginBottom='1.25rem'>
        <Avatar
          src={learner.avatar}
          alt={learner.name}
          sx={{ width: 250, height: 250, borderRadius: '4px' }}
          variant='square'
        />
        <Box display='flex' flexDirection='column' gap={1} flexGrow='1' justifyContent='center'>
          <Field label='Tên học viên' content={learner.name} />
          <Field label='Email' content={learner.email} />
        </Box>
      </Box>
    </Paper>
  )
}

export default Information
