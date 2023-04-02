import React from 'react';
import styled from 'styled-components';

export const Form = styled.form.attrs(Props => ({
	ref: Props.ref,
	...Props,
}))`
	display: flex;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
`;
