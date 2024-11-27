import React from 'react';
import { Input, Slider } from '@mui/material';

const InputSlider = ({
	value,
	setValue,
	sliderMin,
	sliderMax,
	step = 1,
	handleInputChange,
	handleBlur,
	handleSliderChange,
}) => {
	return (
		<div>
			<Input
				value={value}
				onChange={(e) => handleInputChange(e, setValue)}
				onBlur={() => handleBlur(value, setValue, sliderMin, sliderMax)}
				inputProps={{
					step: step,
					min: sliderMin,
					max: sliderMax,
					type: 'number',
				}}
			/>
			<Slider
				defaultValue={value}
				value={typeof value === 'number' ? value : sliderMin}
				onChange={(event, newValue) =>
					handleSliderChange(event, newValue, setValue)
				}
				min={sliderMin}
				max={sliderMax}
				step={step}
				marks
				valueLabelDisplay="auto"
			/>
		</div>
	);
};

export default InputSlider;
