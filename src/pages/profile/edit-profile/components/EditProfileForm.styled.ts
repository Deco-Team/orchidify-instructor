import styled from '@emotion/styled'
import { Box, Avatar as MuiAvatar } from '@mui/material'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
`
export const FieldWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
export const HeaderWrapper = styled(Box)`
  display: flex;
  gap: 0.5rem;
  flex-grow: 1;
  align-items: center;
`

export const Avatar = styled(MuiAvatar)`
  height: 160px;
  width: 160px;
  object-fit: cover;
`

export const Line = styled(Box)`
  height: 1px;
  background-color: #0000001e;
  flex-grow: 1;
`
