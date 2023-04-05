import React, { useState } from 'react';
import axios from 'service/axios';
import Snack from 'components/Snack';
import { Main } from 'components/Main';
import { Form } from 'components/Form';
import { Speed } from 'components/Speed';
import { Loading } from 'components/Loading';
import { Selecter } from 'components/Selecter';
import { PageTag } from 'components/PageTag';
import { TextInput } from 'components/TextInput';
import { SideMenu } from 'components/SideMenu';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import * as yup from 'yup';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import { IAddress, IBranch } from 'interfaces';
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
	Tab,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import { Add, Close, NewDocument, Save } from 'icons';
import { useCustomContext } from 'context';
import { useRouter } from 'next/router';
import { BranchsTable } from 'components/BranchsTable';
import { BranchModel } from 'Model/BranchModel';
import { AddressModel } from 'Model/AddressModel';
import { Loader } from '@googlemaps/js-api-loader';
import { Map } from 'components/Map';
import { Container } from 'styles/Profile/style';

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

const Profile: NextPage = () => {
	const router = useRouter();
	const [branch, setBranch] = React.useState<IBranch | null>(null);
	const id = router.query.id as string;

	React.useEffect(() => {
		(async () => {
			const profile = await BranchModel.getById(id);
			if (profile) {
				setBranch(profile);
			}
		})();
	}, [id]);
	console.log(branch);
	return (
		<Main>
			<SideMenu />
			<Container>
				<Grid container direction="column" component={'div'}>
					<Grid container item direction="row" spacing={1} padding={1}>
						<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
							
						</Grid>

						<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
							<Map lat={branch?.lat} lng={branch?.long} />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Main>
	);
};

export default Profile;
