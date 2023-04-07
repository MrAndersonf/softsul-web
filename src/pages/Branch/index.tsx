import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Snack from 'components/Snack';
import { Main } from 'components/Main';
import { Form } from 'components/Form';
import { LoadingButton } from '@mui/lab';
import { Speed } from 'components/Speed';
import { Search } from '@mui/icons-material';
import { IAddress, IBranch } from 'interfaces';
import { Selecter } from 'components/Selecter';
import { PageTag } from 'components/PageTag';
import { TextInput } from 'components/TextInput';
import { SideMenu } from 'components/SideMenu';

import {
	Grid,
	Paper,
	Modal,
	Button,
	Checkbox,
	FormControlLabel,
	CircularProgress,
} from '@mui/material';
import {
	states,
	sanitize,
	getCNPJ,
	cnpjMask,
	cepRegex,
	cnpjRegex,
	retrieveCitiesByState,
	truncate,
	delay,
} from 'utils';
import { Close, NewDocument, Save } from 'icons';

import { useRouter } from 'next/router';
import { BranchsTable } from 'components/BranchsTable';
import { BranchModel } from 'Model/BranchModel';
import { AddressModel } from 'Model/AddressModel';
import { useCustomContext } from 'context';
import BranchFilter, { IBranchFilterHandles } from 'components/BranchFilter';
import { Loading } from 'components/Loading';

const Branch: NextPage = () => {
	const router = useRouter();
	const { loading, signIn, signed } = useCustomContext();
	const [id, setId] = React.useState<string>('');
	const [list, setList] = React.useState<IBranch[]>([]);
	const [load, setLoad] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [cities, setCities] = React.useState<any[]>([]);
	const [updateBranch, setUpdateBranch] = React.useState<string>('');
	const [updateAddress, setUpdateAddress] = React.useState<string>('');
	const [loadingOnSaving, setLoadingOnSaving] = React.useState<boolean>(false);

	const refFilter = React.useRef<IBranchFilterHandles>(
		null,
	) as React.MutableRefObject<IBranchFilterHandles>;

	const schema = yup.object().shape({
		name: yup.string().required('Campo obrigatório'),
		street: yup.string().required('Campo obrigatório'),
		zip: yup
			.string()
			.required('Campo obrigatório')
			.matches(cepRegex, 'Formato inválido.'),
		complement: yup.string().nullable(),
		neighborhood: yup.string().required('Campo obrigatório'),
		number: yup.string().required('Campo obrigatório'),
		city: yup.string().required('Campo obrigatório'),
		state: yup.string().required('Campo obrigatório'),

		lat: yup.string().required('Campo obrigatório'),
		long: yup.string().required('Campo obrigatório'),

		cnpj: yup
			.string()
			.required('Campo obrigatório')
			.matches(cnpjRegex, 'Formato inválido')
			.max(18),
		active: yup.boolean(),
	});

	const formik = useFormik({
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: false,
		initialValues: {
			cnpj: '',
			name: '',
			street: '',
			number: '',
			complement: '',
			zip: '',
			neighborhood: '',
			city: '',
			state: '',
			active: true,
			lat: '',
			long: '',
			email: '',
			reference: '',
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				setLoadingOnSaving(true);
				const refAddress = {
					id: '',
					city: values.city,
					complement: values.complement,
					neighborhood: values.neighborhood,
					number: values.number,
					state: values.state,
					street: values.street,
					zipcode: values.zip,
					reference: values.reference,
				} as IAddress;

				const address = new AddressModel(refAddress);
				let updated;
				if (updateAddress !== '') {
					updated = await address.update(updateAddress);
				} else {
					updated = await address.create();
				}

				if (updated !== null) {
					const branch = new BranchModel(
						values.name,
						values.cnpj,
						values.email,
						updated?.id,
						values.lat,
						values.long,
						values.active,
					);

					if (updateBranch !== '') {
						const branchUpdated = await branch.update(updateBranch);
						if (branchUpdated) {
							Snack.success('Filial atualizada com sucesso!');
						}
					} else {
						const newBranch = await branch.create();
						if (newBranch) {
							Snack.success('Filial atualizada com sucesso!');
						}
					}
					setOpen(false);
					resetForm();
					setUpdateBranch('');
					setUpdateAddress('');
					setOpen(false);
					setLoadingOnSaving(false);
				}
			} catch (error: any) {
				Snack.error('Erro ao executar ' + error);
			}
		},
	});

	const handleBranchsTableOnEdit = async (id: string) => {
		const [supplier] = list.filter(e => e.id === id);
		formik.setFieldValue('cnpj', supplier.cnpj);
		formik.setFieldValue('name', supplier.name);
		formik.setFieldValue('street', supplier?.address?.street);
		formik.setFieldValue('number', supplier?.address?.number);
		formik.setFieldValue('complement', supplier?.address?.complement);
		formik.setFieldValue('zip', supplier?.address?.zipcode);
		formik.setFieldValue('neighborhood', supplier?.address?.neighborhood);
		await handleChangeState(supplier?.address?.state);
		formik?.setFieldValue('city', supplier?.address?.city);
		formik?.setFieldValue('active', supplier?.active);
		formik.setFieldValue('lat', supplier?.lat);
		formik.setFieldValue('long', supplier?.long);
		formik.setFieldValue('email', supplier?.email);
		formik.setFieldValue('reference', supplier?.address?.reference ?? '');
		setUpdateBranch(supplier?.id);
		setUpdateAddress(supplier?.address?.id);

		setOpen(true);
	};

	const handleBranchsTableOnDelete = async (ids: readonly string[]) => {
		try {
			const response = await BranchModel.delete(ids as string[]);
			if (response?.status === 200) {
				Snack.success('Operação realizada com sucesso!');
				setList(list.filter(e => !ids.includes(e.id)));
			}
		} catch (error: any) {
			Snack.error('Erro ao executar ' + error.message);
		}
	};

	const handleCNPJ = async () => {
		const { cnpj } = formik.values;
		try {
			setLoad(true);
			await delay(500);
			const parsedCNPJ = sanitize(cnpj).substring(0, 14);
			if (parsedCNPJ.length !== 14) {
				Snack.warning('O CNPJ precisa conter 14 digitos');
				setLoad(false);
				return;
			}
			const data = await getCNPJ(parsedCNPJ);
			if (data.estabelecimento.cnpj) {
				formik.setFieldValue('cnpj', data.estabelecimento.cnpj);

				formik.setFieldValue('name', data.razao_social);

				formik.setFieldValue(
					'street',
					data.estabelecimento.tipo_logradouro +
						' ' +
						data.estabelecimento.logradouro,
				);
				formik.setFieldValue('number', data.estabelecimento.numero);
				formik.setFieldValue('complement', data.estabelecimento.complemento);
				formik.setFieldValue('zip', data.estabelecimento.cep);
				formik.setFieldValue('neighborhood', data.estabelecimento.bairro);
				await handleChangeState(data.estabelecimento.estado.nome);
				formik.setFieldValue('city', data.estabelecimento.cidade.nome);
				formik.setFieldValue(
					'phone',
					data.estabelecimento.ddd1 + ' ' + data.estabelecimento.telefone1,
				);
				setLoad(false);
				Snack.success('Dados obtidos com sucesso.');
			} else {
				setLoad(false);
				Snack.error(`${truncate(data.detalhes, 20)}`);
			}
		} catch (error: any) {
			setLoad(false);
			Snack.error(`${truncate(error.detalhes, 20)}`);
		}
	};

	const handleChange = async (field: string, value: string | number) => {
		if (field === 'state') {
			await handleChangeState(String(value));
			return;
		}
		formik.setFieldValue(field, value);
	};

	const handleClose = () => {
		setOpen(false);
		formik.resetForm();
	};

	const handleOpen = () => {
		setId('');
		setOpen(true);
	};

	const handleOpenFilter = () => {
		refFilter.current?.open();
	};

	const handleChangeState = async (state: string) => {
		if (state?.length > 2) {
			const choice = states.filter(el => el?.name === state);
			formik.setFieldValue('state', choice[0]?.name);
			setCities(await retrieveCitiesByState(choice[0]?.code));
			return;
		}
		const choice = states.filter(el => el.short === state);
		formik.setFieldValue('state', choice[0]?.name);
		setCities(await retrieveCitiesByState(choice[0]?.code));
	};

	const handleOnFilterBranchs = (branch: IBranch[]) => {
		setList(branch);
	};

	const handleCancelCreateOrUpdate = () => {
		setId('');
		handleClose();
	};

	React.useEffect(() => {
		if (!signed && !loading) {
			router.push('/');
		}
		let prev = sessionStorage.getItem('state');
		if (prev !== null) {
			setList(JSON.parse(prev));
		}
	}, [signed, loading, router]);

	React.useEffect(() => {
		sessionStorage.setItem('state', JSON.stringify(list));
	}, [list]);

	if (loading || !signed) {
		return <Loading />;
	}

	console.log(formik.values);

	return (
		<Main>
			<SideMenu />
			<Speed
				actions={[
					{
						exec: handleOpen,
						icon: <NewDocument />,
						name: 'Criar Filial',
					},
					{
						exec: handleOpenFilter,
						icon: <Search />,
						name: 'Filtrar Filiais',
					},
				]}
			/>

			<BranchsTable
				data={list}
				onEdit={handleBranchsTableOnEdit}
				label="Filiais"
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
									<PageTag label="Cadastrar Filial" />
								</Grid>
								<Grid container item direction="row" spacing={1} padding={1}>
									<Grid item xs={7} sm={12} md={12} lg={12} xl={12}>
										<TextInput
											name="cnpj"
											value={cnpjMask(formik.values.cnpj)}
											title="CNPJ da Filial"
											onChange={handleChange}
											error={formik.errors.cnpj}
										/>
									</Grid>
									<Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
										<LoadingButton
											fullWidth
											loading={load}
											variant="contained"
											onClick={handleCNPJ}
											endIcon={<Search />}
										>
											Buscar
										</LoadingButton>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextInput
											name="name"
											value={formik.values.name}
											title="Nome da Filial"
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
									<Grid item xs={12} sm={12} md={9} lg={9} xl={8}>
										<TextInput
											name="street"
											value={formik.values.street}
											title="Logradouro"
											onChange={handleChange}
											error={formik.errors.street}
										/>
									</Grid>
									<Grid item xs={4} sm={4} md={3} lg={3} xl={4}>
										<TextInput
											name="number"
											value={formik.values.number}
											title="Número"
											onChange={handleChange}
											error={formik.errors.number}
										/>
									</Grid>
									<Grid item xs={8} sm={8} md={9} lg={6} xl={6}>
										<TextInput
											name="complement"
											value={formik.values.complement}
											title="Complemento"
											onChange={handleChange}
											error={formik.errors.complement}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
										<TextInput
											name="neighborhood"
											value={formik.values.neighborhood}
											title="Bairro"
											onChange={handleChange}
											error={formik.errors.neighborhood}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
										<Selecter
											name="state"
											title="Estado"
											options={states.map(e => {
												return { value: e.name, text: e.name };
											})}
											error={formik.errors.state}
											value={formik.values.state}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
										<Selecter
											name="city"
											title="Cidade"
											options={cities.map(e => {
												return { text: e.nome, value: e.nome };
											})}
											error={formik.errors.city}
											value={formik.values.city}
											onChange={handleChange}
										/>
									</Grid>

									<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
										<TextInput
											name="lat"
											value={formik.values.lat}
											title="Latitude"
											onChange={handleChange}
											error={formik.errors.lat}
										/>
									</Grid>
									<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
										<TextInput
											name="long"
											value={formik.values.long}
											title="Longitude"
											onChange={handleChange}
											error={formik.errors.long}
										/>
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
												loadingIndicator={
													<CircularProgress
														size={24}
														color="inherit"
														sx={{ color: '##68c601' }}
													/>
												}
												loadingPosition="end"
											>
												{updateBranch === '' ? 'Cadastrar' : 'Atualizar'}
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
			<BranchFilter onFilter={handleOnFilterBranchs} ref={refFilter} />
		</Main>
	);
};

export default Branch;
