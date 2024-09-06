import { Box, Container, Paper, Typography } from '@mui/material'
import styled from '@emotion/styled'

export const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  max-width: 500px;

  @media (min-width: 1200px) {
    height: 100vh;
    max-width: 1200px;
    padding: 0 !important;
  }
`

export const StyledPaper = styled(Paper)`
  width: 100%;

  @media (min-width: 1200px) {
    height: 600px;
  }
`

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 430px;
  height: 100%;
  margin: auto;

  @media (max-width: 1200px) {
    padding: 1rem;
  }

  @media (min-width: 1200px) {
    width: 450px;
  }
`

export const Heading = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 1rem;
`

export const SubHeading = styled(Typography)`
  font-size: 1rem;
  color: #5b5b5b;
  text-align: center;
  margin-bottom: 1rem;
`
