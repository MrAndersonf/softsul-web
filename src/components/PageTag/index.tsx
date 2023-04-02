import React from 'react';
import { Area, Title } from './style';

interface IPageTag {
  label: string;
  padding?: number | undefined;
}

export const PageTag = ({ label, padding }: IPageTag) => {
  return (
    <Area top={padding}>
      <Title>{label}</Title>
    </Area>
  );
};
