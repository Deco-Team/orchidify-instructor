import { MRT_ColumnDef } from 'material-react-table'
import { LessonDto } from '~/data/course-template/course-template.dto'

export const lessonTemplateColumns: MRT_ColumnDef<LessonDto>[] = [
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
