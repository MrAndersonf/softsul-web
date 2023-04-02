import styled from 'styled-components';
import { Button } from '@mui/material';

export const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: center;
	align-items: center;
	background-color: #fff;
`;

export const Company = styled.div`
	display: flex;
	width: 330px;
	height: 30px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-bottom: 20px;
`;

export const Form = styled.form`
	display: flex;
	width: 330px;
	height: 60%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Centro = styled.p`
	margin: 0;
	padding: 0;
	font-size: 38px;
	color: black;
`;

export const Pool = styled.p`
	margin: 0;
	padding: 0;
	font-size: 38px;
	color: gold;
`;

export const Forgot = styled(Button).attrs(Props => ({}))`
	width: 200px;
	height: 50px;
	border: none;
	color: #fff;
	background-color: transparent;
	align-self: flex-end;

	cursor: pointer;
`;

export const CheckArea = styled.div`
	display: flex;
	width: 200px;
	height: 50px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const ButtonTitle = styled.span`
	color: #646d6f;
	text-transform: none;
	font-weight: 700;
	&:hover {
		font-size: 16px;
		color: #0273e5;
	}
`;

export const Title = styled.span`
	color: #646d6f;
	text-transform: none;
	font-weight: 700;
`;

export const Controls = styled.div`
	display: flex;
	width: 330px;
	height: 50px;
	margin: 0 0 20px 0;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;
