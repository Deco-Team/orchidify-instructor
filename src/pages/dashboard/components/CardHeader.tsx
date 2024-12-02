import { Box, Card, CardContent, SvgIconTypeMap, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface CardHeaderProps {
  title: string | number
  body: string
  color: string
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>
}

export const CardHeader = ({ title, body, color, Icon }: CardHeaderProps) => {
  return (
    <Card
      sx={{
        background: `${color}4c`,
        borderColor: color,
        borderRadius: '30px 0 30px 0',
        height: '100%'
      }}
      variant='outlined'
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Icon sx={{ width: 64, height: 64, p: 1, background: color, color: '#FFF', borderRadius: '10px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h4' fontWeight={'500'}>
              {title}
            </Typography>
            <Typography variant='body1'>{body}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
