import React from 'react';
import { LoadingArea } from './style';
import { Main } from 'components/Main';
import { CircularProgress } from '@mui/material';
import { SideMenu } from 'components/SideMenu';

export const Loading = () => {
	return (
		<Main>
			<SideMenu />
			<LoadingArea>
				<CircularProgress />
			</LoadingArea>
		</Main>
	);
};
