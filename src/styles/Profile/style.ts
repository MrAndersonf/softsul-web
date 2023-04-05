import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
	background-image: url('../../assets/waves.svg');
`;

export const BranchInfo = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 0 5px 0 5px;
`;

export const Topic = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 0 0 5px 0;
`;

export const TitleArea = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 15px;
`;

export const Title = styled.p`
	font-family: 'Arve';
	margin: 0;
	padding: 0;
	font-size: 16px;
	font-weight: 700;
`;

export const Desc = styled.p`
	font-family: 'Arve';
	margin: 0;
	padding: 0;
	font-size: 14px;
	color: #98999b;
`;

interface IStatus {
	active: boolean | undefined;
}

export const Status = styled.p<IStatus>`
	font-family: 'Arve';
	margin: 0;
	padding: 0;
	font-size: 14px;
	font-weight: bold;
	color: ${props => (props.active ? '#00bfa6' : '#ff0000')};
`;
