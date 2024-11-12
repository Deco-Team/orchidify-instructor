import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderWrapper = styled(Box)`
  display: flex;
  gap: 10px;
  flex-grow: 1;
  align-items: center;
`

export const Line = styled(Box)`
  height: 1px;
  background-color: #0000001e;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-grow: 1;
`

export const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const MediaWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;
`
