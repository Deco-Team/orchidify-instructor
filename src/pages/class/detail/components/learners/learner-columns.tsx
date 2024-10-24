import { Avatar, Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import fallbackAvatar from '~/assets/avatar.png'
import { SyntheticEvent } from 'react'
import { ClassLearnerDto } from '~/data/class/class.dto'

export const learnerColumns: MRT_ColumnDef<ClassLearnerDto>[] = [
  {
    accessorKey: 'name',
    header: 'Tên học viên',
    Cell: ({ row }) => {
      const { name, avatar } = row.original
      return (
        <Box display='flex'>
          <Avatar
            alt={name}
            src={avatar}
            sx={{ width: 24, height: 24, marginRight: '0.5rem' }}
            slotProps={{
              img: {
                onError: (event: SyntheticEvent<HTMLImageElement, Event>) => (event.currentTarget.src = fallbackAvatar)
              }
            }}
          />
          <Typography variant='body1' marginLeft='0.5rem'>
            {name}
          </Typography>
        </Box>
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  }
]
