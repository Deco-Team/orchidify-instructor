import { Box, Divider, Paper, Typography } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import { SessionDto } from '~/data/course/course.dto'
import { APP_MESSAGE } from '~/global/app-message'

const SessionDetailInformation = ({ session }: { session: SessionDto }) => {
  const { sessionNumber, title, description, media } = session

  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin bài học
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' gap='1rem' marginBottom='1.25rem'>
        <Box display='flex' flexDirection='column' justifyContent='space-between' flexGrow='1'>
          <Typography variant='subtitle1' fontWeight={600}>
            Bài học #{sessionNumber}: {title}
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
        {media.some((value) => value.resource_type === 'video') && (
          <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem' marginTop='1.25rem'>
            Video bài học
          </Typography>
        )}
        {media.map((value, index) => (
          <div
            key={index}
            style={{
              boxSizing: 'border-box'
            }}
          >
            {value.resource_type === 'video' ? (
              <video controls height={200}>
                <source src={value.url} type='video/mp4' />
                {APP_MESSAGE.LOAD_DATA_FAILED('video')}
              </video>
            ) : undefined}
          </div>
        ))}
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Tài nguyên bài học
        </Typography>
        <Carousel>
          {media.map((value, index) => (
            <div
              key={index}
              style={{
                boxSizing: 'border-box'
              }}
            >
              <div style={{ width: '200px', height: '200px', padding: '0 2px' }}>
                {value.resource_type === 'image' ? (
                  <img
                    src={value.url}
                    alt={`Lesson resource ${value.public_id}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : undefined}
              </div>
            </div>
          ))}
        </Carousel>
      </Box>
    </Paper>
  )
}

export default SessionDetailInformation
