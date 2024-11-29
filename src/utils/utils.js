export const calculateDownPayment = (houseValue, downPmtPercent) => {
	return Math.round(houseValue * (downPmtPercent / 100) * 100) / 100;
};

export const formatToDollar = (value) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
};

export const calculateMortgagePayment = (
	loanAmount,
	annualInterestRate,
	loanTermYears
) => {
	const monthlyInterestRate = annualInterestRate / 100 / 12;
	const numberOfPayments = loanTermYears * 12;

	return (
		(loanAmount *
			(monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
		(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
	);
};

export const handleSliderChange = (event, newValue, setVal) => {
	setVal(newValue);
};

export const handleInputChange = (event, setVal) => {
	setVal(event.target.value === '' ? 0 : Number(event.target.value));
};

export const handleBlur = (val, setVal, valMin = 0, ValMax = 1000000) => {
	if (val < valMin) {
		setVal(valMin);
	} else if (val > ValMax) {
		setVal(ValMax);
	}
};
