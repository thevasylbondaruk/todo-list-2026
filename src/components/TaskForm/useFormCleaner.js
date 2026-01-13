import { useCallback, useState } from 'react';

export function useFormCleaner(resetFields) {
	const [wiggle, setWiggle] = useState(false);

	const handleClean = useCallback(() => {
		resetFields();
		setWiggle(false);
		requestAnimationFrame(() => setWiggle(true));
	}, [resetFields]);

	const handleWiggleEnd = useCallback(() => {
		setWiggle(false);
	}, []);

	return { wiggle, handleClean, handleWiggleEnd };
}
