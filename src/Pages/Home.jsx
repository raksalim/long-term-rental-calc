import React from 'react';
import MortgageCalculator from '../Components/MortgageCalculator';
import { Container } from '@mui/material';

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Container>
				<MortgageCalculator />
			</Container>
		</div>
	);
};

export default Home;
