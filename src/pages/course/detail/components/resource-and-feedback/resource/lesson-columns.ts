import { MRT_ColumnDef } from 'material-react-table'
import { LessonDto } from '~/data/course/course.dto'

export const lessonColumns: MRT_ColumnDef<LessonDto>[] = [
  {
    accessorKey: 'title',
    header: 'Tên bài học'
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    size: 500
  }
]
