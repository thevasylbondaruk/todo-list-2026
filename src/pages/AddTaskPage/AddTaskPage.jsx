import {
	TaskFormCard,
	useFormCleaner,
	useTaskFormState,
} from '../../components';
import { createTaskId, saveTask } from '../../shared/storage/tasksStorage';

export default function AddTaskPage() {
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
	} = useTaskFormState();

	const { wiggle, handleClean, handleWiggleEnd } = useFormCleaner(resetFields);

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = getPayload();
		if (!payload) return;

		saveTask({
			id: createTaskId(),
			...payload,
			createdAt: new Date().toISOString(),
			status: 'todo',
		});
		resetFields();
	};

	return (
		<TaskFormCard
			heading="Add task"
			onSubmit={handleSubmit}
			titleProps={{
				placeholder: 'Enter task title',
				value: title,
				onChange: (e) => setTitle(e.target.value),
			}}
			descriptionProps={{
				placeholder: 'Enter task description',
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
	);
}
