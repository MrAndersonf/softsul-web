import React, { useState } from 'react';

import { Main } from 'components/Main';

import { SideMenu } from 'components/SideMenu';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import type { NextPage } from 'next';
import { IBranch } from 'interfaces';

import { Grid } from '@mui/material';

import { useRouter } from 'next/router';

import { BranchModel } from 'Model/BranchModel';

import { Map } from 'components/Map';
import {
	BranchInfo,
	Container,
	Desc,
	LoadArea,
	LoadMain,
	LoadMessage,
	Status,
	Title,
	TitleArea,
	Topic,
} from 'styles/Profile/style';
import { Apartment, Eletric, EmailIcon, Finger, Location } from 'icons';
import { cnpjMask, delay } from 'utils';
import { CircularProgress } from '@material-ui/core';
import { useCustomContext } from 'context';
import { ArrowBack } from '@mui/icons-material';
import { PageTag } from 'components/PageTag';

const Profile: NextPage = () => {
	const router = useRouter();
	const { signed, loading } = useCustomContext();
	const [load, setLoad] = React.useState(true);
	const [branch, setBranch] = React.useState<IBranch | null>(null);
	const id = router.query.id as string;

	React.useEffect(() => {
		if (!signed && !loading) {
			router.push('/');
		}
		(async () => {
			await delay(1000);
			const profile = await BranchModel.getById(id);
			if (profile) {
				setBranch(profile);
			}
			setLoad(false);
		})();
	}, [id]);

	return (
		<Main>
			<SideMenu />
			<Container>
				{!load ? (
					<Grid container direction="column" component={'div'}>
						<Grid container item direction="row" spacing={1} padding={1}>
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Fab
									color="primary"
									aria-label="add"
									size="small"
									onClick={() => router.back()}
									style={{ marginBottom: 20 }}
								>
									<ArrowBack />
								</Fab>
								<PageTag label="Dados da Filial" />
								{!load ? (
									<BranchInfo>
										<Topic>
											<TitleArea>
												<Apartment />
												<Title>Nome</Title>
											</TitleArea>
											<Desc>{branch?.name}</Desc>
										</Topic>
										<Topic>
											<TitleArea>
												<Finger />
												<Title>CNPJ</Title>
											</TitleArea>
											<Desc>{cnpjMask(branch?.cnpj)}</Desc>
										</Topic>
										<Topic>
											<TitleArea>
												<EmailIcon />
												<Title>Contato</Title>
											</TitleArea>
											<Desc>{branch?.email}</Desc>
										</Topic>

										<Topic>
											<TitleArea>
												<Eletric />
												<Title>Status</Title>
											</TitleArea>
											<Status active={branch?.active}>
												{branch?.active ? 'Ativo' : 'Inativo'}
											</Status>
										</Topic>
										<Topic>
											<TitleArea>
												<Location />
												<Title>Endereço</Title>
											</TitleArea>
											<Desc>{`${branch?.address?.street} ${branch?.address?.number}, ${branch?.address?.neighborhood}`}</Desc>
											<Desc>{`${branch?.address?.zipcode} ${branch?.address?.city} - ${branch?.address?.state}`}</Desc>
										</Topic>
									</BranchInfo>
								) : (
									<CircularProgress />
								)}
							</Grid>

							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<Map lat={branch?.lat} lng={branch?.long} />
							</Grid>
						</Grid>
					</Grid>
				) : (
					<LoadArea>
						<LoadMain>
							<CircularProgress
								color="inherit"
								style={{ color: '#fff' }}
								title="Carregando"
							/>
							<LoadMessage>Carregando</LoadMessage>
						</LoadMain>
					</LoadArea>
				)}
			</Container>
		</Main>
	);
};

export default Profile;
