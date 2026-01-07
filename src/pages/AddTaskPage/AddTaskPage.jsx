import { useNavigate } from 'react-router-dom';
import {
	TaskFormCard,
	TaskFormCancelLink,
	TaskFormCleanButton,
	TaskFields,
	useFormCleaner,
	useTaskFormState,
} from '../../components/TaskForm';
import { createTaskId, saveTask } from '../../utils/tasksStorage';

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
	} = useTaskFormState();
	const navigate = useNavigate();

	const { wiggle, handleClean, handleWiggleEnd } = useFormCleaner(resetFields);

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmedTitle = title.trim();
		const trimmedDescription = description.trim();

		if (!trimmedTitle || !trimmedDescription || !endDate) {
			return;
		}

		saveTask({
			id: createTaskId(),
			title: trimmedTitle,
			description: trimmedDescription,
			endDate,
			createdAt: new Date().toISOString(),
			status: 'todo',
		});
		resetFields();
		navigate('/');
	};

	return (
		<TaskFormCard
			heading="Add task"
			topRight={
				<TaskFormCancelLink to="/" ariaLabel="Go home" label="Cancel" />
			}
			onSubmit={handleSubmit}
			footer={
				<>
					<button className="btn btn--primary" type="submit">
						Add
					</button>

					<TaskFormCleanButton
						wiggle={wiggle}
						onClick={handleClean}
						onAnimationEnd={handleWiggleEnd}
					/>
				</>
			}
		>
			<TaskFields
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
			/>
		</TaskFormCard>
	);
}
