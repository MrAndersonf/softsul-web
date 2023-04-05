import styled from 'styled-components';

export const LoadingArea = styled.div`
	display: flex;
	width: 100%;
	height: 80vh;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const LoadMain = styled.div`
	display: flex;
	width: 200px;
	height: 150px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #68c601;
	gap: 10px;
`;

export const LoadMessage = styled.p`
	font-family: 'Arve';
	margin: 0;
	padding: 0;
	font-size: 18px;
	color: #fff;
`;
