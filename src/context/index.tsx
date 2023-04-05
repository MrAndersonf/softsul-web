import React from 'react';
import Snack from 'components/Snack';
import axios from 'service/axios';
export interface IContext {
	name: string | null;
	email: string | null;
	signed: boolean;
	loading: boolean;
	signIn: (email: string, password: string, keep: boolean) => Promise<boolean>;
	signOut: () => Promise<void>;
}

const Context = React.createContext<IContext>({} as IContext);

export interface IContextProvider {
	children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProvider) => {
	const [loading, setLoading] = React.useState(true);
	const [name, setName] = React.useState<string | null>(null);
	const [email, setEmail] = React.useState<string | null>(null);
	const [signed, setSigned] = React.useState<boolean>(false);

	const signIn = async (email: string, password: string, keep: boolean) => {
		try {
			setLoading(true);
			const status = await axios.post('/api/auth', { email, password });

			if (status.status === 200) {
				setEmail(status?.data?.user?.email);
				setName(status?.data?.user?.name);
				setSigned(true);
				if (keep) {
					localStorage.setItem('email', status?.data?.user?.email);
					localStorage.setItem('name', status?.data?.user?.name);
				}

				setLoading(false);
				Snack.success('Usuário autenticado com sucesso');
				Snack.info('Bem vindo ' + status?.data?.user?.name.split(' ')[0]);
				return true;
			}
			Snack.error('Usuário ou senha inválidos');
			setLoading(false);
			return false;
		} catch (error: any) {
			Snack.error('Erro ao logar ' + error.message);
			setLoading(false);
			return false;
		}
	};

	const signOut = async () => {
		setEmail(null);
		setName(null);
		setSigned(false);
	};

	React.useEffect(() => {
		const email = localStorage.getItem('email');
		const name = localStorage.getItem('name');
		if (email && name) {
			setEmail(email);
			setName(name);
			setSigned(true);
		}
		setLoading(false);
	}, []);

	return (
		<Context.Provider
			value={{
				name,
				email,
				signed,
				loading,
				signIn,
				signOut,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useCustomContext = () => {
	const custom = React.useContext(Context);
	return custom;
};
