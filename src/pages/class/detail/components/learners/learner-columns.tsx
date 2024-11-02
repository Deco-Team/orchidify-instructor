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
        <Box display='flex' alignItems={'center'} >
          <Avatar
            alt={name}
            src={avatar}
            sx={{ width: 32, height: 32, marginRight: '0.5rem' }}
            slotProps={{
              img: {
                onError: (event: SyntheticEvent<HTMLImageElement, Event>) => (event.currentTarget.src = fallbackAvatar)
              }
            }}
          />
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
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
