import React from 'react';

import { Container } from './style';

interface IMain {
	children: React.ReactNode[] | React.ReactNode;
}

export const Main = ({ children }: IMain) => {
	return <Container>{children}</Container>;
};
