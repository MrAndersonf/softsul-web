import React from 'react';
import {
	Select as Selector,
	MenuItem,
	InputLabel,
	FormHelperText,
} from '@mui/material';
import { Control } from './style';

interface ISelecter {
	title: string;
	value: string;
	error: string | undefined;
	options: { value: string | number; text: string }[];
	name: string;
	onChange: (field: string, selected: string) => void;
	onBlur?: () => void;
	id?: string;
	open?: boolean;
}

export const Selecter = ({
	title,
	value,
	name,
	error,
	options,
	onChange,
	onBlur,
	id,
	open,
}: ISelecter) => {
	const [opts, setOpts] = React.useState<
		{ value: string | number; text: string }[]
	>([]);

	React.useEffect(() => {
		setOpts(options);
	}, [options]);

	return (
		<Control fullWidth size="small">
			<InputLabel id="demo-simple-select-label" error={error !== undefined}>
				{title}
			</InputLabel>
			<Selector
				id={id}
				open={open}
				fullWidth
				name={name}
				error={error !== undefined}
				labelId={`label-${title}`}
				label={title}
				value={value}
				onChange={text => onChange(name, text.target.value)}
				onBlur={onBlur}
			>
				<MenuItem key="selecione" value="">
					Selecione
				</MenuItem>
				{opts?.map((e, i) => (
					<MenuItem key={i} value={e.value}>
						{e.text}
					</MenuItem>
				))}
			</Selector>
			<FormHelperText error={error !== undefined}>{error}</FormHelperText>
		</Control>
	);
};
