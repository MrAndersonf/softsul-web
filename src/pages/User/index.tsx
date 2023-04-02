import React, { useState } from 'react';

import Snack from 'components/Snack';
import { Main } from 'components/Main';
import { Form } from 'components/Form';
import { Speed } from 'components/Speed';
import { Loading } from 'components/Loading';
import { Selecter } from 'components/Selecter';
import { PageTag } from 'components/PageTag';
import { TextInput } from 'components/TextInput';
import { SideMenu } from 'components/SideMenu';

import * as yup from 'yup';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import { IBranch } from 'interfaces';
import { LoadingButton } from '@mui/lab';
import { Search } from '@mui/icons-material';
import {
	Box,
	Grid,
	Paper,
	Modal,
	Button,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
	states,
	sanitize,
	getCNPJ,
	cepMask,
	cnpjMask,
	cepRegex,
	cnpjRegex,
	retrieveCitiesByState,
	truncate,
} from 'utils';
import { Add, NewDocument } from 'icons';
import { useCustomContext } from 'context';
import { useRouter } from 'next/router';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	margin: 0,
	padding: 0,
	minWidth: 360,
};

const Branch: NextPage = () => {
	const router = useRouter();
	const { loading } = useCustomContext();
	const [id, setId] = useState<string>('');
	const [list, setList] = useState<IBranch[]>([]);
	const [load, setLoad] = useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [cities, setCities] = useState<any[]>([]);

	const schema = yup.object().shape({
		name: yup.string().required('Campo obrigatório'),
		status: yup.string().required('Campo obrigatório'),
		fantasy: yup.string().required('Campo obrigatório'),
		type: yup.string().required('Campo obrigatório'),
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
		phone: yup.string().required('Campo obrigatório'),

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
			status: '',
			cnpj: '',
			type: '',
			name: '',
			fantasy: '',
			street: '',
			number: '',
			complement: '',
			zip: '',
			neighborhood: '',
			city: '',
			state: '',
			phone: '',
			active: true,
		},
		onSubmit: async (values, { resetForm }) => {
			// const newSupplier = new Supplier(values);
			// if (id !== '') {
			// 	const edit = await newSupplier.update(id);
			// 	setList(list.map(el => (el.id === id ? edit : el)));
			// 	setId('');
			// 	handleClose();
			// 	resetForm();
			// 	return;
			// }
			// const created = await newSupplier.create();
			// setList([...list, created]);
			// handleClose();
			// resetForm();
		},
	});

	const edit = async (id: string) => {
		const [supplier] = list.filter(e => e.id === id);
		// formik.setFieldValue('status', supplier.status);
		// formik.setFieldValue('cnpj', supplier.cnpj);
		// formik.setFieldValue('type', supplier.type);
		// formik.setFieldValue('name', supplier.name);
		// formik.setFieldValue('fantasy', supplier.fantasy);
		// formik.setFieldValue('street', supplier.street);
		// formik.setFieldValue('number', supplier.number);
		// formik.setFieldValue('complement', supplier.complement);
		// formik.setFieldValue('zip', supplier.zip);
		// formik.setFieldValue('neighborhood', supplier.neighborhood);
		// await handleChangeState(supplier.state);
		// formik.setFieldValue('city', supplier.city);
		// formik.setFieldValue('phone', supplier.phone);
		// formik.setFieldValue('active', supplier.active);

		setId(id);
		setOpen(true);
	};

	const handleChangeList = (ids: readonly string[]) => {
		setList(list.filter(e => !ids.includes(e.id)));
	};

	const handleCNPJ = async () => {
		const { cnpj } = formik.values;
		try {
			setLoad(true);
			const parsedCNPJ = sanitize(cnpj);
			if (parsedCNPJ.length !== 14) {
				Snack.warning('O CNPJ precisa conter 14 digitos');
				return;
			}
			const data = await getCNPJ(parsedCNPJ);
			if (data.estabelecimento.cnpj) {
				formik.setFieldValue('status', data.estabelecimento.situacao_cadastral);
				formik.setFieldValue('cnpj', data.estabelecimento.cnpj);
				formik.setFieldValue('type', data.estabelecimento.tipo);
				formik.setFieldValue('name', data.razao_social);
				formik.setFieldValue('fantasy', data.estabelecimento.nome_fantasia);
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

	const handleChangeState = async (state: string) => {
		if (state.length > 2) {
			const choice = states.filter(el => el.name === state);
			formik.setFieldValue('state', choice[0]?.name);
			setCities(await retrieveCitiesByState(choice[0].code));
			return;
		}
		const choice = states.filter(el => el.short === state);
		formik.setFieldValue('state', choice[0].name);
		setCities(await retrieveCitiesByState(choice[0].code));
	};

	React.useEffect(() => {}, []);

	return (
		<Main>
			<SideMenu />
			<Speed
				actions={[
					{
						exec: handleOpen,
						icon: <NewDocument />,
						name: 'Criar Fornecedor',
					},
				]}
			/>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
			>
				<Box sx={style}>
					<Form onSubmit={formik.handleSubmit}>
						<Grid
							container
							direction="column"
							elevation={12}
							component={Paper}
							minWidth={400}
						>
							<Grid item>
								<PageTag label="Cadastrar Fornecedor" />
							</Grid>
							<Grid container item direction="row" spacing={2} padding={1}>
								<Grid item xs={8} sm={8} md={8} lg={6} xl={6}>
									<TextInput
										name="cnpj"
										value={cnpjMask(formik.values.cnpj)}
										title="CNPJ do Fornecedor"
										onChange={handleChange}
										error={formik.errors.cnpj}
									/>
								</Grid>
								<Grid item xs={4} sm={4} md={4} lg={3} xl={2}>
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
							</Grid>
							<Grid container item direction="row" spacing={2} padding={1}>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
									<TextInput
										name="name"
										value={formik.values.name}
										title="Razão Social"
										onChange={handleChange}
										error={formik.errors.name}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
									<TextInput
										name="street"
										value={formik.values.street}
										title="Logradouro"
										onChange={handleChange}
										error={formik.errors.street}
									/>
								</Grid>
								<Grid item xs={4} sm={4} md={3} lg={3} xl={2}>
									<TextInput
										name="number"
										value={formik.values.number}
										title="Número"
										onChange={handleChange}
										error={formik.errors.number}
									/>
								</Grid>
								<Grid item xs={8} sm={8} md={9} lg={9} xl={8}>
									<TextInput
										name="complement"
										value={formik.values.complement}
										title="Complemento"
										onChange={handleChange}
										error={formik.errors.complement}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
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
								<Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
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
								<Grid item xs={12} sm={7} md={8} lg={8} xl={6}>
									<TextInput
										name="neighborhood"
										value={formik.values.neighborhood}
										title="Bairro"
										onChange={handleChange}
										error={formik.errors.neighborhood}
									/>
								</Grid>

								<Grid item xs={12} sm={5} md={4} lg={4} xl={2}>
									<TextInput
										name="zip"
										value={cepMask(formik.values.zip)}
										title="CEP"
										onChange={handleChange}
										error={formik.errors.zip}
									/>
								</Grid>

								<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
									<FormControlLabel
										control={
											<Checkbox
												name="active"
												checked={formik.values.active}
												onChange={formik.handleChange}
											/>
										}
										label="Ativo"
									/>
								</Grid>
							</Grid>
							<Grid container item direction="row" spacing={2} padding={1}>
								<Grid item xs={12} sm={4} md={3} lg={4} xl={4}>
									<Button
										fullWidth
										variant="contained"
										endIcon={<AddCircleOutlineIcon />}
										type="submit"
										onClick={() => formik.handleSubmit}
									>
										Criar
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Form>
				</Box>
			</Modal>
		</Main>
	);
};

export default Branch;
