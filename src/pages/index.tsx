import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';
import { Lock } from '@material-ui/icons';
import { Checkbox, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import {
	ButtonTitle,
	Centro,
	CheckArea,
	Company,
	Container,
	Controls,
	Forgot,
	Form,
	Pool,
	Title,
	TitleKeep,
} from '../styles/Login/style';
import { NextPage } from 'next';

const Login: NextPage = () => {
	const schema = yup.object().shape({
		email: yup.string().required('Campo obrigatório'),
		password: yup.string().required('Campo obrigatório'),
		keep: yup.boolean(),
	});

	const formik = useFormik({
		validationSchema: schema,
		validateOnBlur: true,
		validateOnChange: false,
		initialValues: {
			email: '',
			password: '',
			keep: false,
		},

		onSubmit: async (values, { resetForm }) => {},
	});

	const [visible, setVisible] = React.useState<boolean>(false);
	const [load, setLoad] = React.useState<boolean>(false);
	const [focused, setFocused] = useState<'email' | 'password' | ''>();

	const handleFocus = (field: string) => {
		switch (field) {
			case 'email':
				setFocused(field);
				break;
			case 'password':
				setFocused(field);
				break;
			case '':
				setFocused('');
				break;
			default:
				break;
		}
	};

	const handleKeep = () => {
		formik.setFieldValue('keep', !formik.values.keep);
	};

	const handleView = () => {
		setVisible(!visible);
	};

	return (
		<Container>
			<Form onSubmit={formik.handleSubmit}>
				<Company>
					<Centro>Centro</Centro>
					<Pool>Pool</Pool>
				</Company>

				<TextField
					onBlur={() => handleFocus('')}
					onFocus={() => handleFocus('email')}
					name="email"
					sx={{ width: 330, marginBottom: 3 }}
					label="Usuário"
					value={formik.values.email}
					onChange={formik.handleChange}
					helperText={formik.errors.email}
					error={formik.errors.email !== undefined}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle
									color={focused === 'email' ? 'primary' : 'inherit'}
								/>
							</InputAdornment>
						),
					}}
					variant="standard"
				/>
				<TextField
					onBlur={() => handleFocus('')}
					onFocus={() => handleFocus('password')}
					name="password"
					type={visible ? 'text' : 'password'}
					sx={{ width: 330, marginBottom: 3 }}
					helperText={formik.errors.password}
					onChange={formik.handleChange}
					error={formik.errors.password !== undefined}
					label="Senha"
					value={formik.values.password}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Lock color={focused === 'password' ? 'primary' : 'inherit'} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment
								position="start"
								onClick={handleView}
								style={{ cursor: 'pointer' }}
							>
								{!visible ? (
									<VisibilityOff color="error" />
								) : (
									<Visibility color="error" />
								)}
							</InputAdornment>
						),
					}}
					variant="standard"
				/>

				<Controls>
					<CheckArea onClick={handleKeep}>
						<Checkbox
							checked={formik.values.keep}
							style={{ display: 'flex', marginLeft: -10 }}
						/>
						<TitleKeep>Manter conectado</TitleKeep>
					</CheckArea>

					<Forgot
						onClick={(
							event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
						) => {
							event.preventDefault();
						}}
					>
						<ButtonTitle>Esqueci minha senha</ButtonTitle>
					</Forgot>
				</Controls>

				<LoadingButton
					loading={load}
					variant="contained"
					onClick={() => {
						formik.handleSubmit();
					}}
				>
					Acessar sistema
				</LoadingButton>
			</Form>
		</Container>
	);
};

export default Login;
