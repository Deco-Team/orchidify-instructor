import PageHeader from '~/components/header/PageHeader'
import { TitleWrapper } from './ClassRequestList.styled'
import ClassRequestTable from './components/ClassRequestTable'

export default function ClassRequestList() {
  return (
    <>
      <TitleWrapper>
        <PageHeader title='Yêu cầu lớp học' />
      </TitleWrapper>
      <ClassRequestTable />
    </>
  )
}
