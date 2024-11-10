import { useEffect, useRef, useState } from 'react'
import {
  query,
  collection,
  onSnapshot,
  limit,
  where,
  getDocs,
  and,
  addDoc,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore'
import Message from './Message'
import SendMessage from './SendMessage'
import { db } from '~/utils/chat-firebase/firebase'
import { Avatar, Box, Typography } from '@mui/material'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'

interface ChatBoxProps {
  classId: string
  learnerId: string
  instructorId: string
  learner: LearnerDetailResponseDto
}

const ChatBox = ({ classId, learnerId, instructorId, learner }: ChatBoxProps) => {
  const [chatRoomId, setChatRoomId] = useState('')
  const [messages, setMessages] = useState<DocumentData[]>([])
  const scrollRef = useRef<HTMLSpanElement | null>(null)

  const checkExistChatRoom = async () => {
    const q = query(
      collection(db, 'chat-room'),
      and(
        where('classId', '==', classId),
        where('learnerId', '==', learnerId),
        where('instructorId', '==', instructorId)
      )
    )

    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      await addDoc(collection(db, 'chat-room'), {
        classId,
        learnerId,
        instructorId,
        createdAt: serverTimestamp()
      })
    } else {
      setChatRoomId(querySnapshot.docs[0].id)
      const messageQuery = query(
        collection(db, 'message'),
        where('chatRoomId', '==', querySnapshot.docs[0].id),
        limit(50)
      )

      const unsubscribe = onSnapshot(messageQuery, (QuerySnapshot) => {
        const fetchedMessages: DocumentData[] = []
        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id })
        })
        const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt)
        setMessages(sortedMessages)
      })
      return unsubscribe
    }
  }

  useEffect(() => {
    checkExistChatRoom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  const shouldDisplayTimestamp = (prevTimestamp: Date | null, currentTimestamp: Date, minutesGap = 30) => {
    if (!prevTimestamp) return true // Show timestamp if there's no previous timestamp
    return (currentTimestamp.getTime() - prevTimestamp.getTime()) / (1000 * 60) >= minutesGap
  }

  const getMessagePosition = (index: number, messages: DocumentData[]) => {
    const currentMessage = messages[index]
    const prevMessage = messages[index - 1]
    const nextMessage = messages[index + 1]

    const isFirstMessage =
      index === 0 ||
      (prevMessage && prevMessage.senderId !== currentMessage.senderId) ||
      (prevMessage &&
        currentMessage.createdAt &&
        shouldDisplayTimestamp(prevMessage.createdAt?.toDate(), currentMessage.createdAt?.toDate()))

    const isLastMessage =
      index === messages.length - 1 ||
      (nextMessage && nextMessage.senderId !== currentMessage.senderId) ||
      (nextMessage &&
        currentMessage.createdAt &&
        shouldDisplayTimestamp(currentMessage.createdAt?.toDate(), nextMessage.createdAt?.toDate()))

    if (isFirstMessage && isLastMessage) return 'single'
    if (isFirstMessage) return 'first'
    if (isLastMessage) return 'last'
    return 'middle'
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          gap: 2,
          borderBottom: '1px solid #0000003d'
        }}
      >
        <Avatar src={learner.avatar} />
        <Typography variant='h6'>{learner.name}</Typography>
      </Box>
      <Box sx={{ height: 'calc(100% - 161px)', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', overflow: 'auto', padding: '0 24px' }}>
          {messages.map((message, index) => {
            const messageDate = message.createdAt?.toDate() || new Date()
            const previousMessage = messages[index - 1]
            const previousMessageDate = previousMessage?.createdAt?.toDate() || null

            const showDateHeader = !previousMessageDate
            const showTimestamp = !previousMessageDate || shouldDisplayTimestamp(previousMessageDate, messageDate)

            const position = getMessagePosition(index, messages)

            return (
              <Box display={'flex'} flexDirection={'column'} key={message.id}>
                {showDateHeader && (
                  <Typography variant='caption' sx={{ textAlign: 'center', margin: '12px 0' }}>
                    {messageDate.toLocaleString('vi-VN', {
                      weekday: 'short',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                )}
                {showTimestamp && !showDateHeader && (
                  <Typography variant='caption' sx={{ textAlign: 'center', margin: '12px 0' }}>
                    {messageDate.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                )}
                <Message message={message} position={position} />
              </Box>
            )
          })}
          <span ref={scrollRef} />
        </Box>
      </Box>
      <Box sx={{ padding: '0 24px', mt: 2 }}>
        <SendMessage chatRoomId={chatRoomId} scroll={scrollRef} />
      </Box>
    </>
  )
}

export default ChatBox
