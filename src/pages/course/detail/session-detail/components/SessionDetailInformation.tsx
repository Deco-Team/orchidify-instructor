import { Box, Divider, ImageList, ImageListItem, Paper, Typography } from '@mui/material'
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
      <Box sx={{ display: 'flex', gap: 4 }}>
        {media.some((value) => value.resource_type === 'video') && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '50%'
            }}
          >
            <Typography variant='subtitle1' fontWeight={600}>
              Video bài học
            </Typography>
            {media.map((value) =>
              value.resource_type === 'video' ? (
                <video
                  controls
                  style={{ width: '100%', height: '408px', borderRadius: 4, backgroundColor: '#00000025' }}
                >
                  <source src={value.url} type='video/mp4' />
                  {APP_MESSAGE.LOAD_DATA_FAILED('video')}
                </video>
              ) : undefined
            )}
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: media.some((value) => value.resource_type === 'video') ? '50%' : '100%'
          }}
        >
          <Typography variant='subtitle1' fontWeight={600}>
            Tài nguyên bài học
          </Typography>
          <Box maxWidth='100%' overflow={'auto'} position={'relative'}>
            <ImageList sx={{ width: 'fit-content', display: 'flex', m: 0, gap: '8px !important' }}>
              {media.map((value, index) =>
                value.resource_type === 'image' ? (
                  <ImageListItem key={index} sx={{ width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <img
                      src={value.url}
                      alt={`Lesson resource ${value.public_id}`}
                      style={{ width: '200px', height: '200px', borderRadius: '4px' }}
                    />
                  </ImageListItem>
                ) : undefined
              )}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default SessionDetailInformation
