import { useCallback, useEffect, useRef, useState } from 'react'
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
  DocumentData,
  orderBy
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
    if (!querySnapshot.empty) {
      setChatRoomId(querySnapshot.docs[0].id)
    } else {
      const docRef = await addDoc(collection(db, 'chat-room'), {
        classId,
        learnerId,
        instructorId,
        createdAt: serverTimestamp()
      })

      setChatRoomId(docRef.id)
    }
  }

  const loadMessages = useCallback(() => {
    if (!chatRoomId) return

    const messageQuery = query(
      collection(db, 'message'),
      where('chatRoomId', '==', chatRoomId),
      limit(500),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      const fetchedMessages: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id })
      })
      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt)
      setMessages(sortedMessages)
    })

    return unsubscribe
  }, [chatRoomId])

  useEffect(() => {
    checkExistChatRoom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (chatRoomId) {
      const unsubscribe = loadMessages()
      return () => {
        if (unsubscribe) {
          unsubscribe()
        }
      }
    }
  }, [chatRoomId, loadMessages])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  const shouldDisplayTimestamp = (prevTimestamp: Date | null, currentTimestamp: Date, minutesGap = 30) => {
    if (!prevTimestamp) return true // Show timestamp if there's no previous timestamp

    // Check if the messages are on different days
    const isNewDay = !isSameDay(currentTimestamp, prevTimestamp)

    // Check if the gap between messages exceeds the specified minutes
    const timeDifference = (currentTimestamp.getTime() - prevTimestamp.getTime()) / (1000 * 60)
    const isLargeGap = timeDifference >= minutesGap

    // Show timestamp if it's a new day or if there's a large time gap
    return isNewDay || isLargeGap
  }

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return isSameDay(date, today)
  }

  const getMessagePosition = (
    index: number,
    messages: DocumentData[],
    showDateHeader: boolean,
    showTimestamp: boolean
  ) => {
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

    if (showDateHeader || showTimestamp) {
      if (isFirstMessage && isLastMessage) return 'after-header-single'
      if (isFirstMessage) return 'after-header-first'
    }

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

            // Show date header if the date is not today or there’s a 30-minute gap between non-today messages
            const showDateHeader =
              !isToday(messageDate) &&
              (!previousMessageDate ||
                !isSameDay(previousMessageDate, messageDate) ||
                shouldDisplayTimestamp(previousMessageDate, messageDate))

            // Show timestamp if 30-minute gap within the same day, including today
            const showTimestamp =
              isToday(messageDate) || isSameDay(messageDate, previousMessageDate)
                ? shouldDisplayTimestamp(previousMessageDate, messageDate)
                : false

            const position = getMessagePosition(index, messages, showDateHeader, showTimestamp)

            return (
              <Box display={'flex'} flexDirection={'column'} key={message.id}>
                {showDateHeader && (
                  <Typography variant='caption' sx={{ textAlign: 'center', margin: '12px 0' }}>
                    {(() => {
                      const today = new Date()
                      const timeDifference = today.getTime() - messageDate.getTime()
                      const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

                      if (daysDifference <= 7) {
                        // Show only weekday, hour, and minute for messages within the last 7 days
                        return messageDate
                          .toLocaleString('vi-VN', {
                            weekday: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                          .replace('Th ', 'T')
                      } else {
                        // Show full format "hh:mm dd Tháng MM, yyyy" for messages older than 7 days
                        return `${messageDate.toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} ${messageDate.getDate()} Tháng ${messageDate.getMonth() + 1}, ${messageDate.getFullYear()}`
                      }
                    })()}
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
