import React from 'react';
import { useSnackbar, SnackbarKey } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
	keySnack: SnackbarKey;
}

const CloseButton = ({ keySnack }: Props) => {
	const { closeSnackbar } = useSnackbar();
	return (
		<IconButton
			aria-label="Fechar notificação"
			color="inherit"
			onClick={() => closeSnackbar(keySnack)}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);
};

export default CloseButton;
