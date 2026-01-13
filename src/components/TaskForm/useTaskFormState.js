import { useCallback, useState } from 'react';

import { getTodayInputDate } from '../../utils/data';

export function useTaskFormState(initialValues = {}) {
	const [title, setTitle] = useState(initialValues.title ?? '');
	const [description, setDescription] = useState(
		initialValues.description ?? ''
	);
	const [endDate, setEndDate] = useState(initialValues.endDate ?? '');

	const [minDate] = useState(() => getTodayInputDate());

	const resetFields = useCallback(() => {
		setTitle('');
		setDescription('');
		setEndDate('');
	}, []);

	const handleDateBlur = useCallback(() => {
		if (endDate && endDate < minDate) setEndDate(minDate);
	}, [endDate, minDate]);

	const getPayload = useCallback(() => {
		const trimmedTitle = title.trim();
		const trimmedDescription = description.trim();

		if (!trimmedTitle || !trimmedDescription || !endDate) return null;

		if (endDate < minDate) return null;

		return { title: trimmedTitle, description: trimmedDescription, endDate };
	}, [title, description, endDate, minDate]);

	return {
		title,
		description,
		endDate,
		setTitle,
		setDescription,
		setEndDate,
		minDate,
		resetFields,
		handleDateBlur,
		getPayload,
	};
}
