import '../styles/globals.css';
import '../styles/Home.module.css';
import type { AppProps } from 'next/app';
import { AlertDialog } from 'mui-react-alert';
import { Collapse } from '@mui/material';
import { ContextProvider } from 'context';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '../components/Snack';
import CloseButton from '../components/CloseButton';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ContextProvider>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				action={key => <CloseButton keySnack={key} />}
				TransitionComponent={Collapse}
				preventDuplicate
			>
				<SnackbarUtilsConfigurator />
				<AlertDialog />
				<Component {...pageProps} />
			</SnackbarProvider>
		</ContextProvider>
	);
}

export default MyApp;
