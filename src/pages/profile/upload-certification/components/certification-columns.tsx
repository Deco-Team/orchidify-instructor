import { MRT_ColumnDef } from 'material-react-table'
import { InstructorCertificationDto } from '~/data/profile/instructor.dto'

export const certificationColumns: MRT_ColumnDef<InstructorCertificationDto>[] = [
  {
    accessorKey: 'url',
    header: 'File hoặc ảnh',
    grow: false,
    size: 150,
    Cell: ({ row }) => (
      <img
        src={row.original.url.replace('.pdf', '.png')}
        alt={row.original.name}
        width={'107px'}
        height={'80px'}
        style={{ objectFit: 'cover' }}
      />
    ),
    muiTableBodyCellProps: {
      align: 'center'
    },
    muiTableHeadCellProps: {
      align: 'center',
      sx: {
        '.Mui-TableHeadCell-Content-Wrapper': {
          paddingLeft: 0
        }
      }
    }
  },
  { accessorKey: 'name', header: 'Tên chứng chỉ', grow: true, size: 300 }
]
