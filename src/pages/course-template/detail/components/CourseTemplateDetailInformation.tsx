import { Box, Divider, Paper, Typography } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import CourseTemplateStatusTag from '~/components/tag/CourseTemplateStatusTag'
import { CourseTemplateDetailResponseDto } from '~/data/course-template/course-template.dto'
import { CourseTemplateStatus } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

interface FieldProps {
  label: string
  content?: string
  statusTag?: CourseTemplateStatus
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
    {statusTag && <CourseTemplateStatusTag type={statusTag} />}
  </Box>
)

interface CourseTemplateDetailInformationProps {
  courseTemplate: CourseTemplateDetailResponseDto
}

const CourseTemplateDetailInformation = ({ courseTemplate }: CourseTemplateDetailInformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin mẫu khóa học
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' gap='1rem' marginBottom='1.25rem'>
        <Box width='250px' height='250px'>
          <img
            src={courseTemplate.thumbnail}
            alt={courseTemplate.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='space-between' flexGrow='1'>
          <Field label='Tên khóa học' content={courseTemplate.title} />
          <Field label='Giá' content={formatCurrency(courseTemplate.price)} />
          <Field label='Cấp độ' content={formatCourseLevel(courseTemplate.level)} />
          <Field label='Thể loại' content={courseTemplate.type} />
          <Field label='Giới hạn học viên' content={courseTemplate.learnerLimit.toString()} />
          <Field label='Trạng thái' statusTag={courseTemplate.status} />
        </Box>
      </Box>
      <Box marginBottom='1.25rem'>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {courseTemplate.description}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Hình ảnh khóa học
        </Typography>
        <Carousel>
          {courseTemplate.media.map((media) => (
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

export default CourseTemplateDetailInformation
