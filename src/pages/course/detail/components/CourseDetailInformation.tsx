import { Box, Divider, Paper, Typography } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import CourseStatusTag from '~/components/tag/CourseStatusTag'
import { CourseDto } from '~/data/course/course.dto'
import { CourseStatus } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

interface FieldProps {
  label: string
  content?: string
  statusTag?: CourseStatus
}

const Field: React.FC<FieldProps> = ({ label, content, statusTag }) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
    {statusTag && <CourseStatusTag type={statusTag} />}
  </Box>
)

interface CourseDetailInformationProps {
  course: CourseDto
}

const CourseDetailInformation = ({ course }: CourseDetailInformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin khóa học
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' gap='1rem' marginBottom='1.25rem'>
        <Box width='250px' height='250px'>
          <img
            src={course.thumbnail}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='space-between' flexGrow='1'>
          <Field label='Tên khóa học' content={course.title} />
          <Field label='Giá' content={formatCurrency(course.price)} />
          <Field label='Cấp độ' content={formatCourseLevel(course.level)} />
          <Field label='Thể loại' content={course.type} />
          <Field label='Trạng thái' statusTag={course.status} />
          <Field label='Ngày bắt đầu' content={new Date(course.startDate).toLocaleDateString('vi-VN')} />
          <Field label='Số học viên' content={`${course.learnerQuantity}/${course.learnerLimit}`} />
        </Box>
      </Box>
      <Box marginBottom='1.25rem'>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {course.description}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Hình ảnh khóa học
        </Typography>
        <Carousel>
          {course.media.map((media) => (
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
      </Box>
    </Paper>
  )
}

export default CourseDetailInformation
