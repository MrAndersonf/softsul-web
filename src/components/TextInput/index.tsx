import React from 'react';
import TextField from '@mui/material/TextField';
import { Container } from './style';

interface ITextInput {
  width?: number;
  name: string;
  value: string | number;
  title: string;
  error: string | undefined;
  onChange: (field: string, value: string | number) => void;
  onBlur?: () => void;
}

export const TextInput = ({
  width,
  name,
  value,
  title,
  onChange,
  error,
  onBlur,
}: ITextInput) => {
  return (
    <Container>
      <TextField
        size="small"
        fullWidth
        style={{ width: '100%', margin: 0 }}
        name={name}
        id={name}
        value={value}
        label={title}
        variant="outlined"
        error={error !== undefined}
        onChange={text => onChange(name, text.target.value)}
        onBlur={onBlur}
        helperText={error}
      />
    </Container>
  );
};
