import * as React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

interface ISpeedButtonProps {
	actions: { icon: JSX.Element; name: string; exec: () => void }[];
}

export const Speed = ({ actions }: ISpeedButtonProps) => {
	return (
		<SpeedDial
			ariaLabel="SpeedDial playground example"
			hidden={false}
			icon={<SpeedDialIcon />}
			direction={'right'}
			style={{ margin: 12 }}
		>
			{actions.map(action => (
				<SpeedDialAction
					onClick={action.exec}
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
				/>
			))}
		</SpeedDial>
	);
};
