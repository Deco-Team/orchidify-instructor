import styled from '@emotion/styled'
import { Theme } from '@mui/material'

export const ContentWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.info.light};
  border-radius: 4px;
  padding: 1.5rem;
  margin-top: 1.25rem;
  gap: 10px;
`
export const Line = styled.div<{ theme: Theme }>`
  height: 0.75px;
  background-color: ${({ theme }) => theme.palette.info.light};
  flex-grow: 1;
  margin-left: 1rem;
`

export const Avatar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
export const Image = styled.img<{ theme: Theme }>`
  width: 10rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.info.light};
  text-align: center;
  overflow: hidden;
  margin: 20px;
`
export const FlexRow = styled.div`
  display: flex;
`

export const Label = styled.h6<{ theme: Theme }>`
  color: ${({ theme }) => theme.label.secondary};
  font-size: 1rem;
  font-weight: 500;
  text-align: right;
  margin: 0.5rem;
`
export const ContentText = styled.h6`
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  margin: 0.5rem;
`
