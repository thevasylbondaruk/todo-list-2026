export function getTodayInputDate() {
	const date = new Date();
	const pad2 = (value) => String(value).padStart(2, '0');
	return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
		date.getDate()
	)}`;
}

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
});

export function formatShortDate(value) {
	if (!value) return '-';
	if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
		const [year, month, day] = value.split('-').map(Number);
		const dateOnly = new Date(year, month - 1, day);
		return shortDateFormatter.format(dateOnly);
	}
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return '-';
	return shortDateFormatter.format(date);
}
