import * as React from 'react';

import {
	Access,
	Detail,
	MenuIcon,
	Hail,
	HomeIcon,
	GrassIcon,
	EventIcon,
	ScaleIcon,
} from '../../icons';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { AccountCircle, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export const SideMenu = () => {
	const router = useRouter();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [auth, setAuth] = React.useState(true);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleNavigate = (path: string) => {
		router.push(path);
		setOpen(false);
	};

	const opts = [];

	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<CssBaseline />
			<AppBar
				position="fixed"
				open={open}
				color="inherit"
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: 'black',
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon color="white" />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						style={{ color: '#fff' }}
					>
						Centro
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="div"
						style={{ color: 'gold' }}
					>
						pool
					</Typography>
				</Toolbar>

				<div>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<AccountCircle style={{ color: '#fff' }} />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>{'Anderson'}</MenuItem>
						<Divider></Divider>
						<MenuItem style={{ color: 'red' }}>Sair</MenuItem>
					</Menu>
				</div>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List style={{ marginBottom: 0 }}>
					<ListItem
						dense
						disablePadding
						button
						key={'dash'}
						onClick={() => handleNavigate('/Dash')}
					>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={'Dash'} />
						</ListItemButton>
					</ListItem>

					<ListItem
						dense
						disablePadding
						button
						key={'newOrder'}
						onClick={() => handleNavigate('/NovoPedido')}
					>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={'Novo Pedido'} />
						</ListItemButton>
					</ListItem>

					<ListItem
						dense
						disablePadding
						button
						key={'farmer'}
						onClick={() => handleNavigate('/Produtores')}
					>
						<ListItemButton>
							<ListItemIcon>
								<Hail />
							</ListItemIcon>
							<ListItemText primary={'Produtores'} />
						</ListItemButton>
					</ListItem>

					<ListItem
						dense
						disablePadding
						button
						key={'crops'}
						onClick={() => handleNavigate('/Culturas')}
					>
						<ListItemButton>
							<ListItemIcon>
								<GrassIcon />
							</ListItemIcon>
							<ListItemText primary={'Culturas'} />
						</ListItemButton>
					</ListItem>

					<ListItem
						dense
						disablePadding
						button
						key={'units'}
						onClick={() => handleNavigate('/Unidades')}
					>
						<ListItemButton>
							<ListItemIcon>
								<ScaleIcon />
							</ListItemIcon>
							<ListItemText primary={'Unidades'} />
						</ListItemButton>
					</ListItem>

					{/* {(access?.role === 'Desenvolvedor' ||
						access?.role === 'Centropool' ||
						access?.role === 'Diretor' ||
						access?.role === 'Proprietário') && ( */}
					<ListItem
						dense
						disablePadding
						button
						key={'access'}
						onClick={() => handleNavigate('/CadastrarAcesso')}
					>
						<ListItemButton>
							<ListItemIcon>
								<Access />
							</ListItemIcon>
							<ListItemText primary={'Acesso'} />
						</ListItemButton>
					</ListItem>
					{/* )} */}
				</List>
				<Divider />
			</Drawer>
		</Box>
	);
};
