import React, { useState } from 'react';
import MortgageCalculator from '../Components/MortgageCalculator';
import { Container } from '@mui/material';
import ClosingCostCalc from '../Components/ClosingCostCalc';
import { formatToDollar } from '../utils/utils';
import './Home.css';
import OpperatingCostCalc from '../Components/OpperatingCostCalc';

const Home = () => {
	const [houseValue, setHouseValue] = useState(350000);
	const [mortgagePayment, setMortgagePayment] = useState(0);
	const [rent, setRent] = useState(2900);
	const [NOI, setNOI] = useState(0);
	const [totalOpperationalCost, setTotalOpperationalCost] = useState(0);
	const [breakEvenRent, setBreakEvenRent] = useState(0);

	return (
		<div>
			<div style={{ height: '150px' }}></div>
			<div className="floating-header">
				<p>Payment: {formatToDollar(mortgagePayment)}</p>{' '}
				<p>Rent: {formatToDollar(rent)}</p>
				<p>
					Total Opp Cost:{' '}
					{formatToDollar(totalOpperationalCost + mortgagePayment)}
				</p>
				<h2>
					Cashflow:
					{formatToDollar(
						rent - totalOpperationalCost - mortgagePayment
					)}
				</h2>
			</div>
			<Container>
				<MortgageCalculator
					houseValue={houseValue}
					setHouseValue={setHouseValue}
					mortgagePayment={mortgagePayment}
					setMortgagePayment={setMortgagePayment}
				/>
			</Container>
			{/* <ClosingCostCalc houseValue={houseValue} /> */}
			<Container>
				<OpperatingCostCalc
					houseValue={houseValue}
					mortgagePayment={mortgagePayment}
					rent={rent}
					setRent={setRent}
					setBreakEvenRent={setBreakEvenRent}
					NOI={NOI}
					setNOI={setNOI}
					totalOpperationalCost={totalOpperationalCost}
					setTotalOpperationalCost={setTotalOpperationalCost}
				/>
			</Container>
		</div>
	);
};

export default Home;
