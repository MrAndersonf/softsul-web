import React, { useState } from 'react';

import { Main } from 'components/Main';

import { SideMenu } from 'components/SideMenu';

import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
	Status,
	Title,
	TitleArea,
	Topic,
} from 'styles/Profile/style';

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
							<BranchInfo>
								<Topic>
									<TitleArea>
										<ApartmentIcon />
										<Title>Nome</Title>
									</TitleArea>
									<Desc>{branch?.name}</Desc>
								</Topic>
								<Topic>
									<TitleArea>
										<FingerprintIcon />
										<Title>CNPJ</Title>
									</TitleArea>
									<Desc>{branch?.cnpj}</Desc>
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
										<EmailIcon />
										<Title>Status</Title>
									</TitleArea>
									<Status active={branch?.active}>
										{branch?.active ? 'Ativo' : 'Inativo'}
									</Status>
								</Topic>
								<Topic>
									<TitleArea>
										<LocationOnIcon />
										<Title>Endereço</Title>
									</TitleArea>
									<Desc>{`${branch?.address?.street} ${branch?.address?.number}, ${branch?.address?.neighborhood}`}</Desc>
									<Desc>{`${branch?.address?.zipcode} ${branch?.address?.city} - ${branch?.address?.state}`}</Desc>
								</Topic>
							</BranchInfo>
						</Grid>

						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<Map lat={branch?.lat} lng={branch?.long} />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Main>
	);
};

export default Profile;
