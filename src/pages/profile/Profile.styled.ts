import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

export const TitleWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderWrapper = styled(Box)`
  display: flex;
  gap: 0.5rem;
  flex-grow: 1;
  align-items: center;
`

export const Avatar = styled.img`
  border-radius: 100px;
  height: 160px;
  aspect-ratio: 1/1;
  object-fit: cover;
`

export const Line = styled(Box)`
  height: 1px;
  background-color: #0000001e;
  flex-grow: 1;
`

export const DataWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`
