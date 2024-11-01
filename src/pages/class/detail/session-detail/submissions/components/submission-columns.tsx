import { Avatar, Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import SubmissionStatusTag from '~/components/tag/SubmissionStatusTag'
import { AssignmentSubmissionItemResponseDto } from '~/data/class/class.dto'
import { LearnerDetailResponseDto } from '~/data/learner/learner.dto'
import { SubmissionStatus } from '~/global/constants'

export const submissionColumns: MRT_ColumnDef<AssignmentSubmissionItemResponseDto>[] = [
  {
    // accessorKey: 'learner',
    header: 'Tên học viên',
    accessorFn: (row) => row.learner.avatar + row.learner.name,
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
    // accessorKey: 'submission.createdAt',
    header: 'Thời gian nộp',
    size: 150,
    accessorFn: (row) => (row.submission?.createdAt ? new Date(row.submission.createdAt).toLocaleString('vi-VN') : ''),
    Cell: ({ row }) => {
      const date = row.original.submission?.createdAt
      return (
        date && (
          <>
            <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
              {new Date(date).toLocaleTimeString('vi-VN')}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
              {new Date(date).toLocaleDateString('vi-VN')}
            </Typography>
          </>
        )
      )
    },
    enableColumnFilter: false
  },
  {
    // accessorKey: 'submission.point',
    header: 'Điểm',
    size: 100,
    filterVariant: 'range',
    accessorFn: (row) => row.submission?.point ?? '',
    Cell: ({ row }) => (
      <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
        {row.original.submission?.point ?? ''}
      </Typography>
    ),
    filterFn: (row, _id, filterValue) => {
      const point = row.original.submission?.point
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
    // accessorKey: 'submission.status',
    header: 'Trạng thái',
    size: 120,
    accessorFn: (row) => row.submission?.status ?? 'Chưa nộp',
    Cell: ({ row }) => {
      const type = row.original.submission?.status
      return <SubmissionStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Đã nộp', value: SubmissionStatus.SUBMITTED },
      { label: 'Đã chấm', value: SubmissionStatus.GRADED },
      { label: 'Chưa nộp', value: 'Chưa nộp' }
    ],
    enableSorting: false
  }
]
