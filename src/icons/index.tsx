import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

import CloseIcon from '@mui/icons-material/Close';

import SaveIcon from '@mui/icons-material/Save';
import Search from '@mui/icons-material/Search';
import HailIcon from '@mui/icons-material/Hail';
import Menu from '@mui/icons-material/Menu';
import Scale from '@mui/icons-material/Scale';
import Grass from '@mui/icons-material/Grass';
import Home from '@mui/icons-material/Home';
import Event from '@mui/icons-material/Event';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import AttachFile from '@mui/icons-material/AttachFile';
import Warehouse from '@mui/icons-material/Warehouse';
import Agriculture from '@mui/icons-material/Agriculture';
import ArrowDown from '@mui/icons-material/ArrowDownward';

import AccountCircular from '@mui/icons-material/AccountCircle';

import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import GridViewIcon from '@mui/icons-material/GridView';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { PictureAsPdf } from '@mui/icons-material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Cached from '@mui/icons-material/Cached';

interface IICons {
	color?: string;
	size?: number;
}

export const Add = ({ color, size }: IICons) => {
	return <AddIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Square = ({ color, size }: IICons) => {
	return <GridViewIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Access = ({ color, size }: IICons) => {
	return (
		<EnhancedEncryptionIcon
			sx={{ fontSize: size || 22, color: color || null }}
		/>
	);
};

export const Detail = ({ color, size }: IICons) => {
	return (
		<DisplaySettingsIcon sx={{ fontSize: size || 22, color: color || null }} />
	);
};

export const FilterAlt = ({ color, size }: IICons) => {
	return <FilterAltIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Save = ({ color, size }: IICons) => {
	return <SaveIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Pdf = ({ color, size }: IICons) => {
	return <PictureAsPdf sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Close = ({ color, size }: IICons) => {
	return <CloseIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const NewDocument = ({ color, size }: IICons) => {
	return (
		<DocumentScannerIcon sx={{ fontSize: size || 22, color: color || null }} />
	);
};

export const ArrowDownIcon = ({ color, size }: IICons) => {
	return <ArrowDown sx={{ fontSize: size || 22, color: color || null }} />;
};

export const ArrowRightIcon = ({ color, size }: IICons) => {
	return (
		<ArrowForwardIcon sx={{ fontSize: size || 22, color: color || null }} />
	);
};

export const SearchIcon = ({ color, size }: IICons) => {
	return <Search sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Delete = ({ color, size }: IICons) => {
	return <DeleteIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const List = ({ color, size }: IICons) => {
	return (
		<FormatListNumberedIcon
			sx={{ fontSize: size || 22, color: color || null }}
		/>
	);
};

export const GrassIcon = ({ color, size }: IICons) => {
	return <Grass sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Truck = ({ color, size }: IICons) => {
	return (
		<LocalShippingIcon sx={{ fontSize: size || 22, color: color || null }} />
	);
};

export const Reload = ({ color, size }: IICons) => {
	return <CachedIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const ListBullet = ({ color, size }: IICons) => {
	return (
		<FormatListBulletedIcon
			sx={{ fontSize: size || 22, color: color || null }}
		/>
	);
};

export const Clear = ({ color, size }: IICons) => {
	return (
		<CleaningServicesIcon sx={{ fontSize: size || 22, color: color || null }} />
	);
};

export const MenuIcon = ({ color, size }: IICons) => {
	return <Menu sx={{ fontSize: size || 22, color: color || null }} />;
};

export const Hail = ({ color, size }: IICons) => {
	return <HailIcon sx={{ fontSize: size || 22, color: color || null }} />;
};

export const HomeIcon = ({ color, size }: IICons) => {
	return <Home sx={{ fontSize: size || 22, color: color || null }} />;
};

export const ScaleIcon = ({ color, size }: IICons) => {
	return <Scale sx={{ fontSize: size || 22, color: color || null }} />;
};

export const EventIcon = ({ color, size }: IICons) => {
	return <Event sx={{ fontSize: size || 22, color: color || null }} />;
};

export const AccountCircle = ({ color, size }: IICons) => {
	return (
		<AccountCircular sx={{ fontSize: size || 22, color: color || null }} />
	);
};

export const AttachFileIcon = ({ color, size }: IICons) => {
	return <AttachFile sx={{ fontSize: size || 22, color: color || null }} />;
};
export const WarehouseIcon = ({ color, size }: IICons) => {
	return <Warehouse sx={{ fontSize: size || 22, color: color || null }} />;
};
export const AgricultureIcon = ({ color, size }: IICons) => {
	return <Agriculture sx={{ fontSize: size || 22, color: color || null }} />;
};
