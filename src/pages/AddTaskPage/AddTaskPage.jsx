import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import {
	TaskFormCard,
	useFormCleaner,
	useTaskFormState,
} from '../../components';
import { createTask as repoCreateTask } from '../../repositories/tasksRepository';
import { createTaskId } from '../../shared/storage/tasksStorage';

export default function AddTaskPage() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const {
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
	} = useTaskFormState({
		title: '',
		description: '',
		endDate: '',
	});

	const { wiggle, handleClean, handleWiggleEnd } = useFormCleaner(resetFields);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		const payload = getPayload();
		if (!payload) return;

		// ВАЖНО: задаём id сами (uuid), чтобы edit/:id работал стабильно
		const draft = {
			id: createTaskId(),
			createdAt: Date.now(),
			status: 'todo',
			...payload, // title, description, endDate
		};

		try {
			await repoCreateTask(draft);
			navigate(paths.home);
		} catch (e) {
			setError(e);
		}
	};

	return (
		<>
			{error ? (
				<p role="alert" style={{ padding: '8px 0' }}>
					Failed to create task (API may be unavailable).
				</p>
			) : null}

			<TaskFormCard
				heading="Add task"
				onSubmit={handleSubmit}
				titleProps={{
					value: title,
					onChange: (e) => setTitle(e.target.value),
				}}
				descriptionProps={{
					value: description,
					onChange: (e) => setDescription(e.target.value),
				}}
				dateProps={{
					min: minDate,
					max: '9999-12-31',
					value: endDate,
					onChange: (e) => setEndDate(e.target.value),
					onBlur: handleDateBlur,
				}}
				button="Add"
				wiggle={wiggle}
				onClick={handleClean}
				onAnimationEnd={handleWiggleEnd}
			/>
		</>
	);
}
