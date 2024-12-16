export const convertDate = dateString => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};

export const getLastActivity = dateString => {
	const givenDate = new Date(dateString);
	const today = new Date();

	today.setHours(0, 0, 0, 0);
	givenDate.setHours(0, 0, 0, 0);

	const timeDifference = today - givenDate;

	return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

export const isDateNull = date => {
	return date === '0001-01-01T00:00:00';
};
