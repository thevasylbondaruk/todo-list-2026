import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import {
	TaskFormCard,
	useFormCleaner,
	useTaskFormState,
} from '../../components';
import {
	getTaskById as repoGetTaskById,
	updateTask as repoUpdateTask,
} from '../../repositories/tasksRepository';

export default function EditTaskPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [task, setTask] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// ВАЖНО: хук формы вызываем всегда (по правилам хуков)
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

	useEffect(() => {
		let ignore = false;

		(async () => {
			try {
				setError(null);
				setLoading(true);

				const t = await repoGetTaskById(id);

				if (ignore) return;

				setTask(t);
				setTitle(t?.title ?? '');
				setDescription(t?.description ?? '');
				setEndDate(t?.endDate ?? '');
			} catch (e) {
				if (!ignore) setError(e);
			} finally {
				if (!ignore) setLoading(false);
			}
		})();

		return () => {
			ignore = true;
		};
	}, [id, setTitle, setDescription, setEndDate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!task) return;

		const payload = getPayload();
		if (!payload) return;

		try {
			await repoUpdateTask(task.id, {
				...payload,
				// можно не передавать, но безопасно оставить:
				createdAt: task.createdAt,
				status: task.status,
			});
			navigate(paths.home);
		} catch (e) {
			setError(e);
		}
	};

	if (loading) return <p style={{ padding: '8px 0' }}>Loading…</p>;

	if (error) {
		return (
			<p role="alert" style={{ padding: '8px 0' }}>
				Failed to load/save task (API may be unavailable).
			</p>
		);
	}

	if (!task) {
		return <p style={{ padding: '8px 0' }}>Task not found.</p>;
	}

	return (
		<TaskFormCard
			heading="Edit task"
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
			button="Done"
			wiggle={wiggle}
			onClick={handleClean}
			onAnimationEnd={handleWiggleEnd}
		/>
	);
}
