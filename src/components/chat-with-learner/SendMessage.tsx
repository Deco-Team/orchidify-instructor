import React, { MutableRefObject, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '~/utils/chat-firebase/firebase'
import { User } from 'firebase/auth'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { Send } from '@mui/icons-material'

interface SendMessageProps {
  scroll: MutableRefObject<HTMLSpanElement | null>
  chatRoomId: string
}

const SendMessage = ({ scroll, chatRoomId }: SendMessageProps) => {
  const [message, setMessage] = useState('')

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message.trim() === '') {
      return
    }

    const { uid } = auth.currentUser as User
    const newMessage = {
      chatRoomId: chatRoomId,
      message: message,
      createdAt: serverTimestamp(),
      senderId: uid,
      senderRole: 'INSTRUCTOR'
    }

    await addDoc(collection(db, 'message'), newMessage)
    setMessage('')
    scroll.current?.scrollIntoView({ behavior: 'smooth' }) // Scroll to bottom
  }

  return (
    <form onSubmit={sendMessage}>
      <OutlinedInput
        type='text'
        fullWidth
        placeholder='Aa'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton type='submit' edge='end'>
              <Send />
            </IconButton>
          </InputAdornment>
        }
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
    </form>
  )
}

export default SendMessage
