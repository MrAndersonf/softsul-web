import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSnackbar, OptionsObject, WithSnackbarProps } from 'notistack';

export enum VariantType {
	default = 'default',
	error = 'error',
	success = 'success',
	warning = 'warning',
	info = 'info',
}

interface SnackProps {
	setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<SnackProps> = ({
	setUseSnackbarRef,
}) => {
	setUseSnackbarRef(useSnackbar());
	return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
	useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = (children?: React.ReactNode) => {
	return (
		<InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef}>
			{children}
		</InnerSnackbarUtilsConfigurator>
	);
};

const defaultSnackMessageLength = 1000;

const trimMessage = (
	msg: string,
	length: number = defaultSnackMessageLength,
) => {
	return msg.substring(0, length);
};

const obj = {
	success(msg: string, options: OptionsObject = {}) {
		this.toast(trimMessage(msg), {
			...options,
			variant: VariantType.success,
			preventDuplicate: true,
			anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
		});
	},
	warning(msg: string, options: OptionsObject = {}) {
		this.toast(trimMessage(msg), {
			...options,
			variant: VariantType.warning,
			preventDuplicate: true,
			anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
		});
	},
	info(msg: string, options: OptionsObject = {}) {
		this.toast(trimMessage(msg), {
			...options,
			variant: VariantType.info,
			preventDuplicate: true,
			anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
		});
	},
	error(msg: string, options: OptionsObject = {}) {
		this.toast(trimMessage(msg), {
			...options,
			variant: VariantType.error,
			preventDuplicate: true,

			anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
		});
	},
	toast(msg: string, options: OptionsObject = {}) {
		useSnackbarRef.enqueueSnackbar(msg, options);
	},
	loading(msg: string, options: OptionsObject) {
		this.toast(trimMessage(msg), {
			...options,
			variant: 'info',
			persist: true,
			content: (id: number) => {
				return (
					<div key={id} style={{ width: '100%' }}>
						<CircularProgress color="primary" />
					</div>
				);
			},
		});
	},
};

export default obj;
