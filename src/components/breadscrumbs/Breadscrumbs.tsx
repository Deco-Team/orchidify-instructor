import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, LinkProps as MuiLinkProps, Typography } from '@mui/material'
import { Link, LinkProps } from 'react-router-dom'

const LinkRouter = (props: MuiLinkProps & LinkProps) => {
  return <MuiLink {...props} component={Link} />
}

export interface BreadcrumbsItem {
  name: string
  path: string
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[]
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs aria-label='breadcrumb' maxItems={3}>
      {items.map((item, index) => {
        const last = index === items.length - 1

        return last ? (
          <Typography color='text.primary' key={item.name}>
            {item.name}
          </Typography>
        ) : (
          <LinkRouter underline='hover' color='inherit' key={item.name} to={item.path}>
            {item.name}
          </LinkRouter>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
