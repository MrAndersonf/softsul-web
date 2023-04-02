import React from 'react';
export interface IContext {
	email: string | null;
	signed: boolean;
	loading: boolean;
}

const Context = React.createContext<IContext>({} as IContext);

export interface IContextProvider {
	children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProvider) => {
	const [loading, setLoading] = React.useState(true);
	const [email, setEmail] = React.useState<string | null>(null);
	const [signed, setSigned] = React.useState<boolean>(false);

	React.useEffect(() => {}, []);

	return (
		<Context.Provider
			value={{
				email,
				signed,
				loading,
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
