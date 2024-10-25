import PageHeader from '~/components/header/PageHeader'
import CustomTabs from '~/components/tabs/CustomTabs'
import ClassTable from './components/ClassTable'
import { ClassStatus } from '~/global/constants'

export default function ViewClassList() {
  return (
    <>
      <PageHeader title='Lớp học' />
      <CustomTabs
        name='courseList'
        items={[
          { label: 'Công khai', content: <ClassTable statusFilter={ClassStatus.PUBLISHED} /> },
          { label: 'Đang diễn ra', content: <ClassTable statusFilter={ClassStatus.IN_PROGRESS} /> },
          { label: 'Đã kết thúc', content: <ClassTable statusFilter={ClassStatus.COMPLETED} /> },
          { label: 'Tất cả', content: <ClassTable /> }
        ]}
      />
    </>
  )
}
