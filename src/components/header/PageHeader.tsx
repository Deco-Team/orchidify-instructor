import { Box, Typography } from '@mui/material'
import Breadcrumbs, { BreadcrumbsItem } from '../breadscrumbs/Breadscrumbs'

interface PageHeaderProps {
  title: string
  breadcrumbsItems?: BreadcrumbsItem[]
}

const PageHeader = ({ title, breadcrumbsItems = [] }: PageHeaderProps) => {
  return (
    <Box>
      <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
        {title}
      </Typography>
      {breadcrumbsItems.length ? <Breadcrumbs items={breadcrumbsItems} /> : null}
    </Box>
  )
}

export default PageHeader
