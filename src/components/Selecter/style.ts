import styled from 'styled-components';
import { FormControl } from '@mui/material';

interface IControl {
  width?: number;
}

export const Control = styled(FormControl).attrs(Props => ({
  fullWidth: true,
  ...Props,
}))<IControl>`
  margin: 0 0px 0px 0px;
`;
