import { Box, Typography } from '@mui/material'
import Breadcrumbs, { BreadcrumbsItem } from '../breadscrumbs/Breadscrumbs'

interface PageHeaderProps {
  title: string
  breadcrumbsItems?: BreadcrumbsItem[]
}

const PageHeader = ({ title, breadcrumbsItems = [] }: PageHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant='h1' sx={{ fontSize: '2rem', fontWeight: 700 }}>
        {title}
      </Typography>
      {breadcrumbsItems.length ? <Breadcrumbs items={breadcrumbsItems} /> : null}
    </Box>
  )
}

export default PageHeader
