import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import {
	TaskFormCard,
	useFormCleaner,
	useTaskFormState,
} from '../../components';
import { loadTasks, updateTask } from '../../shared/storage/tasksStorage';

export default function EditTaskPage() {
	const { id } = useParams();
	const currentTask = useMemo(() => {
		const tasks = loadTasks();
		return tasks.find((task) => task.id === id) ?? null;
	}, [id]);
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
		title: currentTask?.title,
		description: currentTask?.description,
		endDate: currentTask?.endDate,
	});
	const navigate = useNavigate();
	const taskMeta = currentTask
		? {
				id: currentTask.id,
				createdAt: currentTask.createdAt,
				status: currentTask.status,
		  }
		: null;
	const isMissing = !taskMeta;

	const { wiggle, handleClean, handleWiggleEnd } = useFormCleaner(resetFields);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isMissing) return;
		const payload = getPayload();
		if (!payload) return;

		updateTask({
			...taskMeta,
			...payload,
		});
		navigate(paths.home);
	};

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
