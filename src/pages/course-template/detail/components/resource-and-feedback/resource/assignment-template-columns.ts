import { MRT_ColumnDef } from 'material-react-table'
import { AssignmentDto } from '~/data/course-template/course-template.dto'

export const assignmentTemplateColumns: MRT_ColumnDef<AssignmentDto>[] = [
  {
    accessorKey: 'title',
    header: 'Tên bài tập'
  }
]
