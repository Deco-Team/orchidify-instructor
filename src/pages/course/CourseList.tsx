import { Button } from '@mui/material'
import { TitleWrapper } from './CourseList.styled'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import PageHeader from '~/components/header/PageHeader'
import CustomTabs from '~/components/tabs/CustomTabs'
import CourseTable from './components/CourseTable'
import { CourseStatus } from '~/global/constants'

export default function CourseList() {
  return (
    <>
      <TitleWrapper>
        <PageHeader title='Khóa học' />
        <Button color='secondary' component={Link} to={protectedRoute.createCourse.path} endIcon={<Add />}>
          Thêm khóa học
        </Button>
      </TitleWrapper>
      <CustomTabs
        name='courseList'
        items={[
          { label: 'Bản Nháp', content: <CourseTable statusFilter={CourseStatus.DRAFT} /> },
          { label: 'Chờ duyệt', content: <CourseTable statusFilter={CourseStatus.REQUESTING} /> },
          { label: 'Công khai', content: <CourseTable statusFilter={CourseStatus.ACTIVE} /> }
        ]}
      />
    </>
  )
}
