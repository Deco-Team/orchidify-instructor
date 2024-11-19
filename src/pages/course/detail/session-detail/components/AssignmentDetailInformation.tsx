import { InsertDriveFileOutlined } from '@mui/icons-material'
import { Box, Divider, Paper, Typography } from '@mui/material'
import { AssignmentDto } from '~/data/course/course.dto'

const AssignmentDetailInformation = ({ assignment }: { assignment: AssignmentDto }) => {
  const { title, description, attachments } = assignment

  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin bài tập
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' gap='1rem' marginBottom='1.25rem'>
        <Box display='flex' flexDirection='column' justifyContent='space-between' flexGrow='1'>
          <Typography variant='subtitle1' fontWeight={600}>
            Bài tập: {title}
          </Typography>
        </Box>
      </Box>
      <Box marginBottom='1.25rem'>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {description}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Tài liệu
        </Typography>
        {attachments.map((value, index) => (
          <div
            key={index}
            style={{
              boxSizing: 'border-box'
            }}
          >
            <div style={{ width: '100%', height: '100%', padding: '0 2px' }}>
              {value.resource_type === 'image' ? (
                <img
                  src={value.url}
                  alt={`Lesson resource ${value.public_id}`}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
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
                  onClick={() => window.open(value.url, '_blank')}
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
                    {value.original_filename}
                  </Typography>
                </Box>
              )}
            </div>
          </div>
        ))}
      </Box>
    </Paper>
  )
}

export default AssignmentDetailInformation
