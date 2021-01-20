import styled from 'styled-components'
import { Breadcrumb } from 'react-bootstrap'

export const BreadcrumbCustom = styled(Breadcrumb)`
  .breadcrumb{
    background-color: #fff;
    border: none;
    padding: .75rem 0rem;

    .breadcrumb-item a{
      color: grey;

      &:hover{
        color: #93c54b; 
      }
    }
  }
`;
