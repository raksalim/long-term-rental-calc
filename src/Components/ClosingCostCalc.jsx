import { Input, Slider, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { formatToDollar, handleBlur, handleInputChange, handleSliderChange } from '../utils/utils';

const ClosingCostCalc = ({ houseValue }) => {
	const [closingCostPercent, setClosingCostPercent] = useState(3);
	const [closingCostPercentMin, setClosingCostPercentMin] = useState(1);
	const [closingCostPercentMax, setClosingCostPercentMax] = useState(10);
	const [closingCostAmount, setClosingCostAmount] = useState(
		houseValue * (closingCostPercent / 100)
	);

	return (
		<TableContainer>
			<TableRow>
				<TableCell>Closing Costs</TableCell>
				<TableCell>{formatToDollar(closingCostAmount)}</TableCell>
				<TableCell>
					<Input
						value={closingCostPercent}
						onChange={(e) => {
							handleInputChange(e, setClosingCostPercent);
						}}
						onBlur={() => {
							handleBlur(
								closingCostPercent,
								setClosingCostPercent,
								closingCostPercentMin,
								closingCostPercentMax
							);
						}}
						inputProps={{
							step: 1,
							min: closingCostPercentMin,
							max: closingCostPercentMax,
							type: 'number',
						}}
					/>
				</TableCell>
				<TableCell>
					<Slider
						defaultValue={closingCostPercent}
						value={
							typeof closingCostPercent === 'number'
								? closingCostPercent
								: closingCostPercentMin
						}
						onChange={(event, newValue) => {
							handleSliderChange(
								event,
								newValue,
								setClosingCostPercent
							);
						}}
						min={closingCostPercentMin}
						max={closingCostPercentMax}
						step={1}
						marks
						valueLabelDisplay="auto"
					/>
				</TableCell>
			</TableRow>
		</TableContainer>
	);
};

export default ClosingCostCalc;
