import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'

export const LoaderContainer = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoaderItem = styled(Spinner)`
  width: 50px;
  height: 50px;
`