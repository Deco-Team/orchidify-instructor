import { Avatar, Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import SubmissionStatusTag from '~/components/tag/SubmissionStatusTag'
import { SubmissionDto } from '~/data/class/class.dto'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'
import { SubmissionStatus } from '~/global/constants'

export const submissionColumns: MRT_ColumnDef<SubmissionDto>[] = [
  {
    accessorKey: 'learner',
    header: 'Tên học viên',
    size: 300,
    Cell: ({ row }) => {
      const learner = row.original.learner as LearnerDetailResponseDto

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={learner.avatar} alt={learner.name} sx={{ width: 32, height: 32 }} />
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {learner.name}
          </Typography>
        </Box>
      )
    },
    filterFn: (row, _id, filterValue) => {
      const learner = row.original.learner as LearnerDetailResponseDto
      return learner.name.toLowerCase().includes(filterValue.toString().toLowerCase())
    }
  },
  {
    accessorKey: 'learner.email',
    header: 'Email',
    size: 300
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian nộp',
    size: 150,
    Cell: ({ cell }) => {
      const date = cell.getValue() as string | undefined
      return date ? (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      ) : null
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'point',
    header: 'Điểm',
    size: 100,
    filterVariant: 'range',
    filterFn: (row, _id, filterValue) => {
      const point = row.original.point
      const [min, max] = filterValue
      if (min || max) {
        if (point === undefined) {
          return false
        }
        if (min && max) {
          return point >= min && point <= max
        } else if (min) {
          return point >= min
        } else {
          return point <= max
        }
      }
      return true
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 120,
    Cell: ({ row }) => {
      const type = row.original.status
      return <SubmissionStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Đã nộp', value: SubmissionStatus.SUBMITTED },
      { label: 'Đã chấm', value: SubmissionStatus.GRADED },
      { label: 'Chưa nộp', value: SubmissionStatus.NOT_YET }
    ]
  }
]
