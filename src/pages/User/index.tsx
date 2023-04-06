import React from 'react';
import * as yup from 'yup';
import { IUser } from 'interfaces';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Snack from 'components/Snack';
import { Main } from 'components/Main';
import { Form } from 'components/Form';
import { LoadingButton } from '@mui/lab';
import { Speed } from 'components/Speed';
import { PageTag } from 'components/PageTag';
import { TextInput } from 'components/TextInput';
import { SideMenu } from 'components/SideMenu';
import { Search, Visibility, VisibilityOff } from '@mui/icons-material';
import { Close, NewDocument, Save } from 'icons';

import { useRouter } from 'next/router';
import { UsersTable } from 'components/UsersTable';
import { UserModel } from 'Model/UserModel';
import { useCustomContext } from 'context';
import { Loading } from 'components/Loading';
import UserFilter, { IUserFilterHandles } from 'components/UserFilter';

import {
	Grid,
	Paper,
	Modal,
	Button,
	Checkbox,
	InputLabel,
	IconButton,
	FormControl,
	OutlinedInput,
	FormHelperText,
	InputAdornment,
	CircularProgress,
	FormControlLabel,
} from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	margin: 0,
	padding: 0,
	minWidth: 330,
	maxWidth: 700,
};

const User: NextPage = () => {
	const router = useRouter();
	const { signed, loading } = useCustomContext();
	const [list, setList] = React.useState<IUser[]>([]);
	const [open, setOpen] = React.useState(false);
	const [updateUser, setUpdateUser] = React.useState<string>('');
	const [showPassword, setShowPassword] = React.useState(false);
	const [loadingOnSaving, setLoadingOnSaving] = React.useState<boolean>(false);

	const refUser = React.useRef<IUserFilterHandles>(
		null,
	) as React.MutableRefObject<IUserFilterHandles>;

	const schema = yup.object().shape({
		name: yup.string().required('Campo obrigatório'),
		email: yup.string().email().required('Campo obrigatório'),
		password: yup.string().required('Campo obrigatório'),
		active: yup.boolean(),
	});

	const formik = useFormik({
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: false,
		initialValues: {
			name: '',
			email: '',
			active: true,
			password: '',
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				setLoadingOnSaving(true);
				const refUser = {
					id: '',
					name: values.name,
					email: values.email,
					active: values.active,
					password: values.password,
				} as IUser;

				const address = new UserModel(refUser);

				if (updateUser !== '') {
					let updated = await address.update(updateUser);

					if (updated !== null) {
						const users = list.map(e =>
							e.id === updateUser && updated !== null ? updated : e,
						);
						setList(users);
						setOpen(false);
						resetForm();
						setUpdateUser('');
						Snack.success('Usuário atualizado com sucesso.');
						setOpen(false);
						setLoadingOnSaving(false);
					}
				} else {
					let created = await address.create();
					if (created) {
						setList([...list, created]);

						setOpen(false);
						resetForm();
						setUpdateUser('');
						Snack.success('Usuário criado com sucesso.');
						setOpen(false);
						setLoadingOnSaving(false);
					}
				}
			} catch (error: any) {
				Snack.error('Erro ao executar ' + error.message);
			}
		},
	});

	const handleOpenFilter = () => {
		refUser.current?.open();
	};

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const handleUserTableOnEdit = async (id: string) => {
		const [supplier] = list.filter(e => e.id === id);
		formik.setFieldValue('name', supplier?.name);
		formik?.setFieldValue('active', supplier?.active);
		formik?.setFieldValue('email', supplier?.email);
		setUpdateUser(id);
		setOpen(true);
	};

	const handleBranchsTableOnDelete = async (ids: readonly string[]) => {
		try {
			const response = await UserModel.delete(ids as string[]);
			if (response?.status === 200) {
				Snack.success('Operação realizada com sucesso!');
				setList(list.filter(e => !ids.includes(e.id)));
			}
		} catch (error: any) {
			Snack.error('Erro ao executar ' + error.message);
		}
	};

	const handleChange = async (field: string, value: string | number) => {
		formik.setFieldValue(field, value);
	};

	const handleClose = () => {
		setOpen(false);
		formik.resetForm();
	};

	const handleOpen = () => {
		setUpdateUser('');
		setOpen(true);
	};

	const handleCancelCreateOrUpdate = () => {
		setUpdateUser('');
		handleClose();
	};

	React.useEffect(() => {
		if (!signed && !loading) {
			router.push('/login');
		}
	}, [signed, loading, router]);

	if (!signed || loading) {
		return <Loading />;
	}

	return (
		<Main>
			<SideMenu />
			<Speed
				actions={[
					{
						exec: handleOpen,
						icon: <NewDocument />,
						name: 'Criar usuário',
					},
					{
						exec: handleOpenFilter,
						icon: <Search />,
						name: 'Filtar Usuários',
					},
				]}
			/>

			<UsersTable
				data={list}
				onEdit={handleUserTableOnEdit}
				label="Usuários"
				onDelete={handleBranchsTableOnDelete}
			/>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
			>
				<div
					style={{
						display: 'flex',
						width: '100%',
						height: '100vh',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							maxWidth: 700,
							minWidth: 330,
							margin: 10,
							backgroundColor: '#fff',
						}}
					>
						<Form onSubmit={formik.handleSubmit}>
							<Grid
								container
								direction="column"
								elevation={12}
								component={Paper}
							>
								<Grid item>
									<PageTag label="Cadastrar Usuário" />
								</Grid>
								<Grid container item direction="row" spacing={1} padding={1}>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextInput
											name="name"
											value={formik.values.name}
											title="Nome"
											onChange={handleChange}
											error={formik.errors.name}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextInput
											name="email"
											value={formik.values.email}
											title="E-mail"
											onChange={handleChange}
											error={formik.errors.email}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<FormControl fullWidth variant="outlined" size="small">
											<InputLabel htmlFor="outlined-adornment-password">
												Senha
											</InputLabel>
											<OutlinedInput
												name="password"
												id="outlined-adornment-password"
												type={showPassword ? 'text' : 'password'}
												value={formik.values.password}
												onChange={formik.handleChange}
												error={formik.errors.password !== undefined}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												}
												label="Password"
											/>
											<FormHelperText
												error={formik.errors.password !== undefined}
											>
												{formik.errors.password}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid
										item
										xs={12}
										sm={12}
										md={12}
										lg={12}
										xl={12}
										marginTop={1}
									>
										<FormControlLabel
											label="Ativo"
											control={
												<Checkbox
													name="active"
													checked={formik.values.active}
													onChange={formik.handleChange}
												/>
											}
										/>
									</Grid>
									<Grid container item direction="row" spacing={1} padding={1}>
										<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
											<LoadingButton
												fullWidth
												loading={loadingOnSaving}
												type="submit"
												variant="contained"
												onClick={() => formik.handleSubmit}
												endIcon={<Save />}
												loadingPosition="end"
												loadingIndicator={
													<CircularProgress
														size={24}
														color="inherit"
														sx={{ color: '##68c601' }}
													/>
												}
											>
												{updateUser === '' ? 'Cadastrar' : 'Atualizar'}
											</LoadingButton>
										</Grid>
										<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
											<Button
												fullWidth
												color="error"
												variant="contained"
												endIcon={<Close />}
												onClick={handleCancelCreateOrUpdate}
											>
												Cancelar
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Form>
					</div>
				</div>
			</Modal>
			<UserFilter ref={refUser} onFilter={setList} />
		</Main>
	);
};

export default User;
