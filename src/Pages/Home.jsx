import React, { useState } from 'react';
import MortgageCalculator from '../Components/MortgageCalculator';
import { Container } from '@mui/material';
import ClosingCostCalc from '../Components/ClosingCostCalc';
import { formatToDollar } from '../utils/utils';

const Home = () => {
	const [houseValue, setHouseValue] = useState(350000);
	const [mortgagePayment, setMortgagePayment] = useState(0);

	return (
		<div>
			<h1>Home</h1>
			<style>
				{`
					.floating-header {
						position: fixed;
						top: 0;
						width: 100%;
						background-color: white;
						z-index: 1000;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					}
				`}
			</style>
			<div className="floating-header">
				<h1>{formatToDollar(mortgagePayment)}</h1>
			</div>
			<Container>
				<MortgageCalculator
					houseValue={houseValue}
					setHouseValue={setHouseValue}
					mortgagePayment={mortgagePayment}
					setMortgagePayment={setMortgagePayment}
				/>
				<ClosingCostCalc houseValue={houseValue} />
			</Container>
		</div>
	);
};

export default Home;
