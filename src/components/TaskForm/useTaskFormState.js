import { useCallback, useMemo, useState } from 'react';
import { getTodayInputDate } from '../../utils/date';

export function useTaskFormState(initialValues = {}) {
	const [title, setTitle] = useState(initialValues.title ?? '');
	const [description, setDescription] = useState(
		initialValues.description ?? ''
	);
	const [endDate, setEndDate] = useState(initialValues.endDate ?? '');

	const minDate = useMemo(() => getTodayInputDate(), []);

	const setValues = useCallback((values = {}) => {
		setTitle(values.title ?? '');
		setDescription(values.description ?? '');
		setEndDate(values.endDate ?? '');
	}, []);

	const resetFields = useCallback(() => {
		setValues();
	}, [setValues]);

	const handleDateBlur = useCallback(() => {
		if (endDate && endDate < minDate) setEndDate(minDate);
	}, [endDate, minDate]);

	return {
		title,
		description,
		endDate,
		setTitle,
		setDescription,
		setEndDate,
		minDate,
		resetFields,
		setValues,
		handleDateBlur,
	};
}
