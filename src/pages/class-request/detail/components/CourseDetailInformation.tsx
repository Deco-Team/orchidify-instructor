import { Box, Paper, Typography } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import { formatCourseLevel, formatCurrency } from '~/utils/format'
import { Field } from './RequestDetailInformation'
import { ClassRequestListItemResponseDto } from '~/data/class-request/request.dto'
import { ContentWrapper, HeaderWrapper, Line } from '../ClassRequestDetail.styled'

interface CourseDetailInformationProps {
  request: ClassRequestListItemResponseDto
}

const CourseDetailInformation = ({ request }: CourseDetailInformationProps) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2 }} elevation={2}>
      <HeaderWrapper>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Thông tin khóa học
        </Typography>
        <Line />
      </HeaderWrapper>
      <HeaderWrapper>
        <Box width='250px' height='250px'>
          <img
            src={request.metadata.thumbnail}
            alt={request.metadata.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <ContentWrapper>
          <Field label='Mã khóa học' content={request.metadata.code} />
          <Field label='Tên khóa học' content={request.metadata.title} />
          <Field label='Giá' content={formatCurrency(request.metadata.price)} />
          <Field label='Cấp độ' content={formatCourseLevel(request.metadata.level)} />
          <Field label='Thể loại' content={request.metadata.type.join(', ')} />
          <Field label='Giới hạn học viên' content={request.metadata.learnerLimit.toString()} />
          <Field label='Thời lượng' content={request.metadata.duration + ' tuần'} />
          {request.metadata.rate !== undefined ? <Field label='Đánh giá' rate={request.metadata.rate} /> : null}
        </ContentWrapper>
      </HeaderWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {request.metadata.description}
        </Typography>
      </ContentWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Dụng cụ cần thiết
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {request.metadata.gardenRequiredToolkits}
        </Typography>
      </ContentWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Hình ảnh khóa học
        </Typography>
        <Carousel>
          {request.metadata.media.map((media) => (
            <div
              key={media.public_id}
              style={{
                boxSizing: 'border-box'
              }}
            >
              <div style={{ width: '200px', height: '200px', padding: '0 2px' }}>
                <img
                  src={media.url}
                  alt={`Course Image ${media.public_id}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </ContentWrapper>
    </Paper>
  )
}

export default CourseDetailInformation
