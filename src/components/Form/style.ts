import styled from 'styled-components';

export const CustomForm = styled.form.attrs(Props => ({
  ...Props,
}))`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;
