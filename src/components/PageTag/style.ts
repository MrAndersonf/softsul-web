import styled from 'styled-components';

interface IArea {
  top: number | undefined;
}

export const Area = styled.div<IArea>`
  display: flex;
  margin-top: ${props => (props.top !== undefined ? props.top : 0)}px;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  background-color: #1565c0;
  padding: 0 0 0 15px;
`;

export const Title = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #fff;
`;
