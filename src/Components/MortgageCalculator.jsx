import React, { useEffect, useState } from 'react';
import {
	Container,
	Input,
	Slider,
	Tab,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import {
	calculateDownPayment,
	calculateMortgagePayment,
	formatToDollar,
	handleBlur,
	handleInputChange,
	handleSliderChange,
} from '../utils/utils';

const MortgageCalculator = ({
	houseValue,
	setHouseValue,
	mortgagePayment,
	setMortgagePayment,
}) => {
	const [houseValSliderMin, setHouseValSliderMin] = useState(200000);
	const [houseValSliderMax, setHouseValSliderMax] = useState(600000);

	const [apr, setApr] = useState(7);
	const [aprMin, setAprMin] = useState(2);
	const [aprMax, setAprMax] = useState(20);

	const [numYearsTerm, setNumYearTerm] = useState(30);
	const [numYearsTermMin, setNumYearTermMin] = useState(5);
	const [numYearsTermMax, setNumYearTermMax] = useState(30);

	const [downPmtPercent, setDownPmtPercent] = useState(20);
	const [downPmtPercentMin, setDownPmtPercentMin] = useState(5);
	const [downPmtPercentMax, setDownPmtPercentMax] = useState(50);

	const [downPaymentAmount, setDownPaymentAmount] = useState(
		calculateDownPayment(houseValue, downPmtPercent)
	);

	let loanAmount = houseValue - downPaymentAmount;

	const [defaultPmiPercent, setDefaultPmiPercent] = useState(1.2);
	const [pmiPercent, setPmiPercent] = useState(downPmtPercent < 20 ? 1 : 0);
	const [pmiPercentMin, setPmiPercentMin] = useState(0.2);
	const [pmiPercentMax, setPmiPercentMax] = useState(3);
	const [pmiAmount, setPmiAmount] = useState(
		(houseValue * (pmiPercent / 100)) / 12
	);

	const [showSlider, setShowSlider] = useState(false);

	useEffect(() => {
		if (downPmtPercent < 20 && pmiPercent > 0) {
			setPmiPercent(pmiPercent);
		} else if (downPmtPercent < 20 && pmiPercent === 0) {
			setPmiPercent(defaultPmiPercent);
		} else {
			setPmiPercent(0);
		}
		setPmiAmount((houseValue * (pmiPercent / 100)) / 12);
		console.log(pmiAmount);
		setDownPaymentAmount(calculateDownPayment(houseValue, downPmtPercent));
		setMortgagePayment(
			calculateMortgagePayment(loanAmount, apr, numYearsTerm) + pmiAmount
		);
		console.log(mortgagePayment);
	}, [
		houseValue,
		downPmtPercent,
		apr,
		numYearsTerm,
		pmiPercent,
		pmiAmount,
		showSlider,
	]);

	return (
		<div>
			<h1>Mortgage Calculator</h1>
			<Container>
				<TableContainer>
					<TableHead>
						<TableRow>
							<TableCell>Category</TableCell>
							<TableCell>Value</TableCell>
							<TableCell>Variable</TableCell>
						</TableRow>
					</TableHead>
					<TableRow>
						<TableCell>House Value</TableCell>
						<TableCell>{formatToDollar(houseValue)}</TableCell>
						<TableCell>
							<Input
								value={houseValue}
								onChange={(e) => {
									handleInputChange(e, setHouseValue);
								}}
								onBlur={() => {
									handleBlur(
										houseValue,
										setHouseValue,
										houseValSliderMin,
										houseValSliderMax
									);
								}}
								inputProps={{
									step: 10000,
									min: houseValSliderMin,
									max: houseValSliderMax,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={3}>
							<Slider
								defaultValue={houseValue}
								value={
									typeof houseValue === 'number'
										? houseValue
										: houseValSliderMin
								}
								onChange={(event, newValue) => {
									handleSliderChange(
										event,
										newValue,
										setHouseValue
									);
								}}
								min={houseValSliderMin}
								max={houseValSliderMax}
								step={10000}
								marks
								valueLabelDisplay="auto"
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							onClick={() => {
								setShowSlider(showSlider ? false : true);
							}}
						>
							Down Payment
						</TableCell>
						<TableCell>
							{formatToDollar(downPaymentAmount)}
						</TableCell>
						<TableCell>
							<Input
								value={downPmtPercent}
								onChange={(e) => {
									handleInputChange(e, setDownPmtPercent);
								}}
								onBlur={() => {
									handleBlur(
										downPmtPercent,
										setDownPmtPercent,
										downPmtPercentMin,
										downPmtPercentMax
									);
								}}
								inputProps={{
									step: 1,
									min: downPmtPercentMin,
									max: downPmtPercentMax,
									type: 'number',
								}}
							/>
							%
						</TableCell>
					</TableRow>
					{showSlider && (
						<TableRow>
							<TableCell colSpan={3}>
								<Slider
									color="secondary"
									defaultValue={downPmtPercent}
									value={
										typeof downPmtPercent === 'number'
											? downPmtPercent
											: downPmtPercentMin
									}
									onChange={(event, newValue) => {
										handleSliderChange(
											event,
											newValue,
											setDownPmtPercent
										);
									}}
									min={downPmtPercentMin}
									max={downPmtPercentMax}
									step={1}
									marks
									valueLabelDisplay="auto"
								/>
							</TableCell>
						</TableRow>
					)}
					<TableRow>
						<TableCell>Mortgage Amount</TableCell>
						<TableCell>
							{formatToDollar(houseValue - downPaymentAmount)}
						</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Annual Interest Rate</TableCell>
						<TableCell>{apr}%</TableCell>
						<TableCell>
							<Input
								value={apr}
								onChange={(e) => {
									handleInputChange(e, setApr);
								}}
								onBlur={() => {
									handleBlur(apr, setApr, aprMin, aprMax);
								}}
								inputProps={{
									step: 0.1,
									min: aprMin,
									max: aprMax,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					{showSlider && (
						<TableRow>
							<TableCell colSpan={3}>
								<Slider
									color="secondary"
									defaultValue={apr}
									value={
										typeof apr === 'number' ? apr : aprMin
									}
									onChange={(event, newValue) => {
										handleSliderChange(
											event,
											newValue,
											setApr
										);
									}}
									min={aprMin}
									max={aprMax}
									step={0.1}
									marks
									valueLabelDisplay="auto"
								/>
							</TableCell>
						</TableRow>
					)}

					<TableRow>
						<TableCell>Loan Term (Years)</TableCell>
						<TableCell>{numYearsTerm}</TableCell>
						<TableCell>
							<TextField
								value={numYearsTerm}
								onChange={(e) => {
									handleInputChange(e, setNumYearTerm);
								}}
								onBlur={() => {
									handleBlur(numYearsTerm, setNumYearTerm);
								}}
								inputProps={{
									step: 5,
									min: numYearsTermMin,
									max: numYearsTermMax,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					{showSlider && (
						<TableRow>
							<TableCell colSpan={3}>
								<Slider
									color="secondary"
									defaultValue={numYearsTerm}
									value={
										typeof numYearsTerm === 'number'
											? numYearsTerm
											: 5
									}
									onChange={(event, newValue) => {
										handleSliderChange(
											event,
											newValue,
											setNumYearTerm
										);
									}}
									min={numYearsTermMin}
									max={numYearsTermMax}
									step={5}
									marks
									valueLabelDisplay="auto"
								/>
							</TableCell>
						</TableRow>
					)}
					<TableRow>
						<TableCell>PMI</TableCell>
						<TableCell>{formatToDollar(pmiAmount)}</TableCell>
						<TableCell>
							<TextField
								value={pmiPercent}
								onChange={(e) => {
									handleInputChange(e, setPmiPercent);
								}}
								onBlur={() => {
									handleBlur(pmiPercent, setPmiPercent);
								}}
								inputProps={{
									step: 5,
									min: pmiPercentMin,
									max: pmiPercentMax,
									type: 'number',
								}}
							/>
						</TableCell>
					</TableRow>
					{showSlider && (
						<TableRow>
							<TableCell>
								<Slider
									color="secondary"
									defaultValue={pmiPercent}
									value={
										typeof pmiPercent === 'number'
											? pmiPercent
											: 1
									}
									onChange={(event, newValue) => {
										handleSliderChange(
											event,
											newValue,
											setPmiPercent
										);
										setDefaultPmiPercent(newValue);
									}}
									min={pmiPercentMin}
									max={pmiPercentMax}
									step={0.1}
									marks
									valueLabelDisplay="auto"
								/>
							</TableCell>
						</TableRow>
					)}
					<TableRow>
						<TableCell>Payment Amount</TableCell>
						<TableCell>{formatToDollar(mortgagePayment)}</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableContainer>
			</Container>
		</div>
	);
};

export default MortgageCalculator;
