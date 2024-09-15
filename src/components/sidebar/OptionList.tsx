import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { options } from './options'

interface OptionListProps {
  open: boolean
}

const OptionList = ({ open }: OptionListProps) => {
  const [button, setButton] = useState<number>(1)

  const handleClick = (id: number) => {
    setButton(id)
  }

  const location = useLocation()
  useEffect(() => {
    const option = options.find((option) => location.pathname.includes(option.link))
    if (option) {
      setButton(option.id)
    } else {
      setButton(0)
    }
  }, [location])

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <List>
        {options.map(({ Icon, ...option }) => (
          <ListItem
            key={option.id}
            disablePadding
            sx={{
              display: 'block',
              borderLeft: option.id === button ? 4 : 0,
              borderColor: '#2EC4B6',
              bgcolor: option.id === button ? '#FFFFFF' : 'inherit'
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
              onClick={() => handleClick(option.id)}
              component={Link}
              to={option.link}
            >
              <ListItemIcon
                sx={{
                  minWidth: 24,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: option.id === button ? '#2EC4B6' : '#3c3c4399'
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={option.text}
                primaryTypographyProps={{ fontWeight: 500, color: option.id === button ? '#2EC4B6' : '#3c3c4399' }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default OptionList
