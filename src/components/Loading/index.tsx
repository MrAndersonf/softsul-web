import React from 'react';
import { LoadingArea } from './style';
import { Main } from 'Components/Main';
import { CircularProgress } from '@mui/material';
import { SideMenu } from 'Components/SideMenu';

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
