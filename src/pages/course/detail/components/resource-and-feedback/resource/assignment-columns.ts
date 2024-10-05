import { MRT_ColumnDef } from 'material-react-table'
import { AssignmentDto } from '~/data/course/course.dto'

export const assignmentColumns: MRT_ColumnDef<AssignmentDto>[] = [
  {
    accessorKey: 'title',
    header: 'Tên bài tập'
  }
]
