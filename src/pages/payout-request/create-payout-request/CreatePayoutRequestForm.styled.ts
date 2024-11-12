import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  margin-top: 1.25rem;
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

export const Line = styled(Box)`
  height: 1px;
  background-color: #0000001e;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-grow: 1;
`
