import {
	Container,
	Input,
	Slider,
	Tab,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
	formatToDollar,
	handleBlur,
	handleInputChange,
	handleSliderChange,
} from '../utils/utils';

const OpperatingCostCalc = ({
	houseValue,
	mortgagePayment,
	rent,
	setRent,
	NOI,
	setNOI,
	totalOpperationalCost,
	setTotalOpperationalCost,
}) => {
	const [vacancySavingsPercent, setVacancySavingsPercent] = useState(5);
	const [insurancePerYear, setInsurancePerYear] = useState(2000);
	const [propertyTaxPercent, setPropertyTaxPercent] = useState(1.2);
	const [propertyTaxAmount, setPropertyTaxAmount] = useState(
		(propertyTaxPercent / 100) * houseValue
	);
	const [hoa, setHoa] = useState(2000);
	const [other, setOther] = useState(2000);

	const [bareOppCostPerYear, setBareOppCostPerYear] = useState(
		insurancePerYear + propertyTaxAmount + hoa
	);
	const [bareOppCost, setBareOppCost] = useState(bareOppCostPerYear / 12);

	const [
		asideForMaintinancePercentage,
		setAsideForMaintinancePercentage,
	] = useState(5);

	const [utilities, setUtilities] = useState(2000);
	const [propertyManagement, setPropertyManagement] = useState(2000);

	const [rentMin, setRentMin] = useState(1000);
	const [rentMax, setRentMax] = useState(4000);

	useEffect(() => {
		setNOI(rent - bareOppCost);
		setTotalOpperationalCost(
			bareOppCost +
				(vacancySavingsPercent / 100) * rent +
				(asideForMaintinancePercentage / 100) * rent +
				other / 12
		);
	}, [NOI, rent, bareOppCost, totalOpperationalCost, vacancySavingsPercent]);

	return (
		<div>
			<h5>Operating Cost Calculator</h5>
			<Container>
				<TableContainer>
					<TableHead>
						<TableRow>
							<TableCell>Category</TableCell>
							<TableCell>Monthly</TableCell>
							<TableCell>Yearly</TableCell>
						</TableRow>
					</TableHead>

					<TableRow>
						<TableCell>Rent</TableCell>
						<TableCell>{formatToDollar(rent)}</TableCell>
						<TableCell>
							<Input
								value={rent * 12}
								onChange={(e) => {
									handleInputChange(e, setRent);
								}}
								onBlur={() => {
									handleBlur(rent, setRent, rentMin, rentMax);
								}}
								inputProps={{
									step: 100 * 12,
									min: rentMin * 12,
									max: rentMax * 12,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={3}>
							<Slider
								defaultValue={rent}
								value={
									typeof rent === 'number' ? rent : rentMin
								}
								onChange={(event, newValue) => {
									handleSliderChange(
										event,
										newValue,
										setRent
									);
								}}
								min={rentMin}
								max={rentMax}
								step={50}
								marks
								valueLabelDisplay="auto"
							/>
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>Insurance</TableCell>
						<TableCell>
							{formatToDollar(insurancePerYear / 12)}
						</TableCell>
						<TableCell>
							<Input
								value={insurancePerYear}
								onChange={(e) => {
									handleInputChange(e, setInsurancePerYear);
								}}
								inputProps={{
									step: 100,
									min: 0,
									max: 10000,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Property Tax</TableCell>
						<TableCell>
							{formatToDollar(propertyTaxAmount / 12)}
						</TableCell>
						<TableCell>
							<Input
								value={propertyTaxPercent}
								onChange={(e) => {
									handleInputChange(e, setPropertyTaxPercent);
								}}
								inputProps={{
									step: 0.1,
									min: 0,
									max: 10,
									type: 'number',
								}}
							/>{' '}
							%
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>HOA</TableCell>
						<TableCell>{formatToDollar(hoa / 12)}</TableCell>
						<TableCell>
							<Input
								value={hoa}
								onChange={(e) => {
									handleInputChange(e, setHoa);
								}}
								inputProps={{
									step: 100,
									min: 0,
									max: 10000,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>-- Bare Operating Cost -- </TableCell>
						<TableCell>{formatToDollar(bareOppCost)}</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>
							Vacancy ({vacancySavingsPercent}%)
						</TableCell>
						<TableCell>
							{formatToDollar(
								rent * (vacancySavingsPercent / 100)
							)}
						</TableCell>
						<TableCell>
							{' '}
							{formatToDollar(
								rent * (vacancySavingsPercent / 100) * 12
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							Aside for Maintinance (
							{asideForMaintinancePercentage}%)
						</TableCell>
						<TableCell>
							{formatToDollar(
								rent * (asideForMaintinancePercentage / 100)
							)}
						</TableCell>
						<TableCell>
							{formatToDollar(
								rent *
									(asideForMaintinancePercentage / 100) *
									12
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Other</TableCell>
						<TableCell>{formatToDollar(other / 12)}</TableCell>
						<TableCell>
							<Input
								value={other}
								onChange={(e) => {
									handleInputChange(e, setOther);
								}}
								inputProps={{
									step: 100,
									min: 0,
									max: 10000,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Total Opp Cost</TableCell>
						<TableCell>
							{formatToDollar(totalOpperationalCost)}
						</TableCell>
						<TableCell>
							{formatToDollar(totalOpperationalCost * 12)}
						</TableCell>
					</TableRow>
				</TableContainer>
			</Container>
		</div>
	);
};

export default OpperatingCostCalc;
