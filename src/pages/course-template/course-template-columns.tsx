import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import CourseTemplateStatusTag from '~/components/tag/CourseTemplateStatusTag'
import { CourseTemplateListItemResponseDto } from '~/data/course-template/course-template.dto'
import { CourseLevel, CourseTemplateStatus } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

export const courseTemplateColumns: MRT_ColumnDef<CourseTemplateListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Mẫu khóa học',
    size: 500
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    maxSize: 120,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      const price = cell.getValue() as number
      return formatCurrency(price)
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    size: 120,
    Cell: ({ cell }) => {
      const level = cell.getValue() as CourseLevel

      return (
        <Typography
          variant='subtitle2'
          color={
            level === CourseLevel.BASIC
              ? '#20c017'
              : level === CourseLevel.INTERMEDIATE
                ? '#ffcf22'
                : level === CourseLevel.ADVANCED
                  ? 'f66868'
                  : undefined
          }
        >
          {formatCourseLevel(level)}
        </Typography>
      )
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Cơ bản', value: CourseLevel.BASIC },
      { label: 'Trung bình', value: CourseLevel.INTERMEDIATE },
      { label: 'Nâng cao', value: CourseLevel.ADVANCED }
    ]
  },
  {
    accessorKey: 'type',
    header: 'Thể loại',
    size: 180
  },
  {
    accessorKey: 'learnerLimit',
    header: 'Giới hạn học viên',
    size: 200,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    Cell: ({ cell }) => {
      const type = cell.getValue() as CourseTemplateStatus
      return <CourseTemplateStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Bản nháp', value: CourseTemplateStatus.DRAFT },
      { label: 'Chờ duyệt', value: CourseTemplateStatus.REQUESTING },
      { label: 'Đang hoạt động', value: CourseTemplateStatus.ACTIVE }
    ]
  }
]
