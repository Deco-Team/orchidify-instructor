import { Box, Paper, Typography } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import { formatCourseLevel, formatCurrency } from '~/utils/format'
import { Field } from './RequestDetailInformation'
import { ClassRequestDetailResponseDto } from '~/data/class-request/class-request.dto'
import { ContentWrapper, HeaderWrapper, Line } from '../ClassRequestDetail.styled'
import { RequestType } from '~/global/constants'

interface CourseDetailInformationProps {
  request: ClassRequestDetailResponseDto
}

const CourseDetailInformation = ({ request }: CourseDetailInformationProps) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2.5 }} elevation={2}>
      <HeaderWrapper>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Thông tin khóa học
        </Typography>
        <Line />
      </HeaderWrapper>
      <HeaderWrapper>
        <Box width='250px' height='250px'>
          <img
            src={request.type === RequestType.PUBLISH_CLASS ? request.metadata.thumbnail : request.class!.thumbnail}
            alt={request.type === RequestType.PUBLISH_CLASS ? request.metadata.title : request.class!.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <ContentWrapper>
          {request.type === RequestType.PUBLISH_CLASS ? (
            <>
              <Field label='Mã khóa học' content={request.metadata.code} />
              <Field label='Tên khóa học' content={request.metadata.title} />
              <Field label='Giá' content={formatCurrency(request.metadata.price)} />
              <Field label='Cấp độ' content={formatCourseLevel(request.metadata.level)} />
              <Field label='Thể loại' content={request.metadata.type.join(', ')} />
              <Field label='Giới hạn học viên' content={request.metadata.learnerLimit.toString()} />
              <Field label='Thời lượng' content={request.metadata.duration + ' tuần'} />
              {request.metadata.rate !== undefined ? <Field label='Đánh giá' rate={request.metadata.rate} /> : null}
            </>
          ) : (
            <>
              <Field label='Mã khóa học' content={request.class!.course.code} />
              <Field label='Tên khóa học' content={request.class!.title} />
              <Field label='Giá' content={formatCurrency(request.class!.price)} />
              <Field label='Cấp độ' content={formatCourseLevel(request.class!.level)} />
              <Field label='Thể loại' content={request.class!.type.join(', ')} />
              <Field label='Giới hạn học viên' content={request.class!.learnerLimit.toString()} />
              <Field label='Thời lượng' content={request.class!.duration + ' tuần'} />
              {request.class!.rate !== undefined ? <Field label='Đánh giá' rate={request.class!.rate} /> : null}
            </>
          )}
        </ContentWrapper>
      </HeaderWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {request.type === RequestType.PUBLISH_CLASS ? request.metadata.description : request.class!.description}
        </Typography>
      </ContentWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Dụng cụ cần thiết
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {request.type === RequestType.PUBLISH_CLASS
            ? request.metadata.gardenRequiredToolkits
            : request.class!.gardenRequiredToolkits}
        </Typography>
      </ContentWrapper>

      <ContentWrapper>
        <Typography variant='subtitle1' fontWeight={600}>
          Hình ảnh khóa học
        </Typography>
        <Carousel>
          {(request.type === RequestType.PUBLISH_CLASS ? request.metadata.media : request.class!.media).map((media) => (
            <div
              key={media.public_id}
              style={{
                boxSizing: 'border-box'
              }}
            >
              <div style={{ width: '100%', height: '100%', padding: '0 2px' }}>
                <img
                  src={media.url}
                  alt={`Course Image ${media.public_id}`}
                  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
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
