import React from 'react';
import { LoadingArea, LoadMain, LoadMessage } from './style';
import { Main } from 'components/Main';
import { CircularProgress } from '@mui/material';

export const Loading = () => {
	return (
		<Main>
			<LoadingArea>
				<LoadMain>
					<CircularProgress style={{ color: '#fff' }} />
					<LoadMessage>Redirecionando</LoadMessage>
				</LoadMain>
			</LoadingArea>
		</Main>
	);
};
