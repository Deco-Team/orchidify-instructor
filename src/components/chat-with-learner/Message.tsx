import { DocumentData } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '~/utils/chat-firebase/firebase'
import { Box, Typography } from '@mui/material'

interface MessageProps {
  message: DocumentData
  position: 'single' | 'first' | 'middle' | 'last'
}

const Message = ({ message, position }: MessageProps) => {
  const [user] = useAuthState(auth)

  const borderRadiusRight = {
    single: '18px',
    first: '18px 18px 4px 18px',
    middle: '18px 4px 4px 18px',
    last: '18px 4px 18px 18px'
  }[position]

  const borderRadiusLeft = {
    single: '18px',
    first: '18px 18px 18px 4px',
    middle: '4px 18px 18px 4px',
    last: '4px 18px 18px 18px'
  }[position]

  return (
    <Box
      sx={{
        maxWidth: '500px',
        width: 'fit-content',
        borderRadius: user?.uid === message.senderId ? borderRadiusRight : borderRadiusLeft,
        padding: '8px 16px',
        backgroundColor: user?.uid === message.senderId ? '#2EC4B6' : '#00000033',
        marginLeft: user?.uid === message.senderId ? 'auto' : '0',
        marginTop: position === 'middle' || position === 'last' ? '2px' : '0px'
      }}
    >
      <Box display='flex' flexDirection='column' gap={0.5}>
        <Typography variant='body1' sx={{ color: user?.uid === message.senderId ? 'white' : 'black' }}>
          {message.message}
        </Typography>
        {(position === 'last' || position === 'single') && (
          <Typography
            variant='caption'
            sx={{
              color: user?.uid === message.senderId ? 'white' : 'black',
              textAlign: user?.uid === message.senderId ? 'right' : 'left'
            }}
          >
            {new Date(message.createdAt?.toDate()).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Message
