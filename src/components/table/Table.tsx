import { Typography, useTheme } from '@mui/material'
import { MaterialReactTable, MRT_RowData, MRT_TableOptions, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_VI } from 'material-react-table/locales/vi'

interface TableProps<TData extends MRT_RowData> {
  title: string
  tableOptions: MRT_TableOptions<TData>
}

const Table = <TData extends MRT_RowData>({ title, tableOptions }: TableProps<TData>) => {
  const theme = useTheme()

  const table = useMaterialReactTable({
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableDensityToggle: false,
    enableGlobalFilter: false,
    enableFilterMatchHighlighting: false,
    localization: MRT_Localization_VI,
    muiTablePaperProps: {
      sx: {
        marginTop: '1.25rem'
      }
    },
    muiTableHeadProps: {
      sx: {
        height: '56px'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: '#f6f6f6',
        border: '1px solid #0000001f'
      }
    },
    muiTableHeadCellProps: {
      sx: {
        verticalAlign: 'middle'
      }
    },
    renderTopToolbarCustomActions: () => (
      <Typography variant='subtitle1' my={'auto'} sx={{ color: theme.palette.info.dark }}>
        {title}
      </Typography>
    ),
    ...tableOptions
  })

  return <MaterialReactTable table={table} />
}

export default Table
