import React, { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { EOrder } from 'enums';

import { Add, Edit, FilterList } from '@mui/icons-material';
import { IBranch, IBranchShow } from 'interfaces';
import { cnpjMask, getComparator } from 'utils';

function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number,
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof IBranchShow;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'position',
		numeric: false,
		disablePadding: true,
		label: 'Código',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Nome',
	},
	{
		id: 'cnpj',
		numeric: false,
		disablePadding: false,
		label: 'CNPJ',
	},
	{
		id: 'city',
		numeric: false,
		disablePadding: false,
		label: 'Cidade',
	},
	{
		id: 'state',
		numeric: false,
		disablePadding: false,
		label: 'Estado',
	},
	{
		id: 'active',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof IBranchShow,
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: EOrder;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof IBranchShow) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface IBranchsTable {
	label: string;
	data: IBranch[];
	onEdit: (id: string) => void;
	onDelete: (ids: readonly string[]) => void;
}

export const BranchsTable = ({
	label,
	data,
	onEdit,
	onDelete,
}: IBranchsTable) => {
	const [renderer, setRenderer] = React.useState<IBranchShow[]>([]);
	const [order, setOrder] = React.useState<EOrder>(EOrder.asc);
	const [orderBy, setOrderBy] = React.useState<keyof IBranchShow>('id');
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	interface EnhancedTableToolbarProps {
		numSelected: number;
		label: string;
	}

	const handleEdition = () => {
		const [supplier] = data.filter(el => selected.includes(el.id));
		onEdit(supplier.id);
	};

	const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
		const { numSelected, label } = props;

		const deleteRegisters = async () => {
			onDelete(selected);
			setSelected([]);
		};

		return (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: theme =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity,
							),
					}),
				}}
			>
				{numSelected > 0 ? (
					<Typography
						sx={{ flex: '1 1 100%' }}
						color="inherit"
						variant="subtitle1"
						component="div"
					>
						{numSelected} {numSelected === 1 ? ' Selecionado' : 'Selecionados'}
					</Typography>
				) : (
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						{label}
					</Typography>
				)}
				{numSelected > 0 ? (
					<>
						<Tooltip title="Delete" onClick={deleteRegisters}>
							<IconButton>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
						{numSelected === 1 && (
							<Tooltip title="Editar" onClick={handleEdition}>
								<IconButton>
									<Edit fill="red" />
								</IconButton>
							</Tooltip>
						)}
					</>
				) : (
					<>
						<Tooltip title="Filtrar Lista">
							<IconButton>
								<FilterList />
							</IconButton>
						</Tooltip>
						<Tooltip title="Adicionar">
							<IconButton>
								<Add />
							</IconButton>
						</Tooltip>
					</>
				)}
			</Toolbar>
		);
	};

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof IBranchShow,
	) => {
		const isAsc = orderBy === property && order === EOrder.asc;
		setOrder(isAsc ? EOrder.desc : EOrder.asc);
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = data.map(n => n.id.toString());
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	function defaultLabelDisplayedRows({ from, to, count }: any) {
		return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name: string) => {
		return selected.indexOf(name) !== -1;
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	useEffect(() => {
		const branchs = data.map((branch, index) => {
			return {
				id: branch.id,
				name: branch?.name,
				cnpj: branch?.cnpj,
				city: branch?.address?.city,
				state: branch?.address?.state,
				lat: branch?.coordinates?.lat,
				long: branch?.coordinates?.long,
				position: index + 1,
				active: branch?.active === true ? 'Ativo' : 'Inativo',
			} as IBranchShow;
		});
		setRenderer(branchs);
	}, [data]);

	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: 400,
				flexDirection: 'column',
				backgroundColor: '',
				justifyContent: 'flex-start',
				alignItems: 'center',
				marginTop: 20,
			}}
		>
			<Paper sx={{ width: '98%' }} style={{ backgroundColor: '#f3f3f3' }}>
				<EnhancedTableToolbar numSelected={selected.length} label={label} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size="small"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody sx={{ maxHeight: 300 }}>
							{stableSort<IBranchShow>(
								renderer.map((product, i) => product as IBranchShow),
								getComparator(order, orderBy),
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(({ id, name, city, cnpj, active, state }, index) => {
									const isItemSelected = isSelected(id.toString());
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={event => handleClick(event, id.toString())}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId,
													}}
												/>
											</TableCell>
											<TableCell
												align="left"
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												{index + 1}
											</TableCell>

											<TableCell align="left">{name}</TableCell>
											<TableCell align="left">{cnpjMask(cnpj)}</TableCell>
											<TableCell align="left">{city}</TableCell>
											<TableCell align="left">{state}</TableCell>
											<TableCell align="left">{active}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 33 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 20]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage="Linhas por Pagina"
					labelDisplayedRows={defaultLabelDisplayedRows}
				/>
			</Paper>
		</div>
	);
};
