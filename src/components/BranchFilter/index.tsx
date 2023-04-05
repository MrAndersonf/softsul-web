import React from 'react';
import * as yup from 'yup';
import axios from 'service/axios';
import { useFormik } from 'formik';
import { IBranch } from 'interfaces';
import Snack from 'components/Snack';
import { useRouter } from 'next/router';
import { Main } from 'components/Main';
import { Close, SearchIcon } from 'icons';
import { Form } from 'components/Form';
import { LoadingButton } from '@mui/lab';
import { useCustomContext } from 'context';
import { Selecter } from 'components/Selecter';
import { PageTag } from 'components/PageTag';
import { CircularProgress } from '@mui/material';
import { TextInput } from 'components/TextInput';
import { BranchModel } from 'Model/BranchModel';
import {
	Grid,
	Paper,
	Modal,
	Button,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import {
	states,
	delay,
	sanitize,
	getCNPJ,
	truncate,
	cnpjMask,
	retrieveCitiesByState,
} from 'utils';

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

export interface IBrancheFilter {
	onFilter: (filter: IBranch[]) => void;
}

export interface IBranchFilterHandles {
	open: () => void;
	close: () => void;
}

const BranchFilter: React.ForwardRefRenderFunction<
	IBranchFilterHandles,
	IBrancheFilter
> = ({ onFilter }: IBrancheFilter, ref) => {
	const [open, setOpen] = React.useState(false);
	const [cities, setCities] = React.useState<any[]>([]);

	const [loadingOnSearch, setLoadingOnSearch] = React.useState<boolean>(false);

	const schema = yup.object().shape({
		name: yup.string(),
		city: yup.string(),
		state: yup.string(),
		cnpj: yup.string().max(18),
		active: yup.boolean(),
	});

	const formik = useFormik({
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: false,
		initialValues: {
			cnpj: '',
			name: '',
			city: '',
			state: '',
			active: true,
		},
		onSubmit: async (values, { resetForm }) => {
			const { cnpj, name, city, state, active } = values;
			try {
				setLoadingOnSearch(true);
				await delay(500);
				const response = await axios.post('/api/branch/filter', {
					cnpj: sanitize(cnpj).substring(0, 14),
					name,
					city,
					state,
					active,
				});

				if (response.data.length === 0) {
					Snack.warning('Nenhum resultado encontrado');
					setLoadingOnSearch(false);
					return;
				}
				setLoadingOnSearch(false);
				onFilter(response.data);
				setOpen(false);
			} catch (error: any) {
				Snack.error(error.message);
				setLoadingOnSearch(false);
			}
		},
	});

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
		setOpen(true);
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

	const handleCancelCreateOrUpdate = () => {
		handleClose();
	};

	React.useImperativeHandle(ref, () => ({
		open: () => {
			handleOpen();
		},
		close: () => {
			handleClose();
		},
	}));

	return (
		<Main>
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
									<PageTag label="Filtrar Filiais" />
								</Grid>
								<Grid container item direction="row" spacing={1} padding={1}>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextInput
											name="cnpj"
											value={cnpjMask(formik.values.cnpj)}
											title="CNPJ da Filial"
											onChange={handleChange}
											error={formik.errors.cnpj}
										/>
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

									<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
											label="Somente filiais ativas"
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
												loading={loadingOnSearch}
												type="submit"
												variant="contained"
												onClick={() => formik.handleSubmit}
												endIcon={<SearchIcon />}
												loadingPosition="end"
												loadingIndicator={
													<CircularProgress
														size={24}
														color="inherit"
														sx={{ color: '##68c601' }}
													/>
												}
											>
												Filtrar
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
		</Main>
	);
};

export default React.forwardRef(BranchFilter);
