import { ExpandLess, ExpandMore, InsertDriveFileOutlined } from '@mui/icons-material'
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { ClassRequestListItemResponseDto } from '~/data/class-request/request.dto'
import { ContentWrapper, Line, MediaWrapper } from '../ClassRequestDetail.styled'
import { APP_MESSAGE } from '~/global/app-message'
import Carousel from '~/components/slider/Carousel'

interface SessionDetailProps {
  request: ClassRequestListItemResponseDto
}

const SessionDetail = ({ request }: SessionDetailProps) => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const handleClick = (item: number) => {
    if (openItem === item) {
      setOpenItem(null)
    } else {
      setOpenItem(item)
    }
  }
  return (
    <Paper elevation={2} sx={{ width: '100%' }}>
      <List
        sx={{ width: '100%' }}
        aria-labelledby='session-list-subheader'
        subheader={
          <ListSubheader component='div' id='session-list-subheader' sx={{ fontSize: 16, lineHeight: 4 }}>
            Danh sách nội dung buổi học
          </ListSubheader>
        }
      >
        <Divider />
        {request.metadata.sessions.map((session, index) => {
          return (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleClick(index)} selected={openItem === index}>
                <ListItemText
                  primary={`Buổi học #${session.sessionNumber} - ` + session.title}
                  primaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
                />
                {openItem === index ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={index === openItem} timeout='auto'>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
                  <Typography variant='subtitle1' fontWeight={600}>
                    Bài học #{session.sessionNumber} - {session.title}
                  </Typography>

                  <ContentWrapper>
                    <Typography variant='subtitle1' fontWeight={600}>
                      Mô tả
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={400}>
                      {session.description}
                    </Typography>
                  </ContentWrapper>

                  <Box sx={{ display: 'flex', gap: 4 }}>
                    {session.media.some((value) => value.resource_type === 'video') && (
                      <MediaWrapper>
                        <Typography variant='subtitle1' fontWeight={600}>
                          Video bài học
                        </Typography>
                        {session.media.map((value) =>
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
                      </MediaWrapper>
                    )}

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        width: session.media.some((value) => value.resource_type === 'video') ? '50%' : '100%'
                      }}
                    >
                      <Typography variant='subtitle1' fontWeight={600}>
                        Tài nguyên bài học
                      </Typography>
                      <Carousel
                        slidesToShow={3}
                        responsive={[
                          {
                            breakpoint: 1440,
                            settings: {
                              slidesToShow: 2
                            }
                          }
                        ]}
                      >
                        {session.media.map((value, index) => (
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
                  </Box>
                  {session.assignments.length > 0 && (
                    <>
                      <Line />
                      {session.assignments.map((assignment, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Typography variant='subtitle1' fontWeight={600}>
                            Bài tập: {assignment.title}
                          </Typography>

                          <ContentWrapper>
                            <Typography variant='subtitle1' fontWeight={600}>
                              Mô tả
                            </Typography>
                            <Typography variant='subtitle1' fontWeight={400}>
                              {assignment.description}
                            </Typography>
                          </ContentWrapper>

                          <ContentWrapper>
                            <Typography variant='subtitle1' fontWeight={600}>
                              Tài liệu
                            </Typography>
                            {assignment.attachments.map((value, index) => (
                              <div
                                key={index}
                                style={{
                                  boxSizing: 'border-box'
                                }}
                              >
                                <div style={{ width: '100%', height: '100%', padding: '0 2px' }}>
                                  {value.resource_type === 'image' && value.format !== 'pdf' ? (
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
                                        gap: 2,
                                        background: '#f4f4f4',
                                        width: 'fit-content',
                                        p: 2.5,
                                        borderRadius: 2,
                                        border: '2px solid #d7d7d7',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                      }}
                                      onClick={() => window.open(value.url, '_blank')}
                                    >
                                      <InsertDriveFileOutlined />
                                      <Typography variant='subtitle1'>{value.public_id}</Typography>
                                    </Box>
                                  )}
                                </div>
                              </div>
                            ))}
                          </ContentWrapper>
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              </Collapse>
            </React.Fragment>
          )
        })}
      </List>
    </Paper>
  )
}

export default SessionDetail
