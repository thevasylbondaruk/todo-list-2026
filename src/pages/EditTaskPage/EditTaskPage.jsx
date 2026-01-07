import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	TaskFormCard,
	TaskFormCancelLink,
	TaskFormCleanButton,
	TaskFields,
	useFormCleaner,
	useTaskFormState,
} from '../../components/TaskForm';
import { loadTasks, updateTask } from '../../utils/tasksStorage';

export default function EditTaskPage() {
	const {
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
	} = useTaskFormState();
	const [taskMeta, setTaskMeta] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const tasks = loadTasks();
		const current = tasks.find((task) => task.id === id);
		if (!current) {
			setTaskMeta({ missing: true });
			return;
		}
		setTaskMeta({
			id: current.id,
			createdAt: current.createdAt,
			status: current.status,
		});
		setValues({
			title: current.title,
			description: current.description,
			endDate: current.endDate,
		});
	}, [id, setValues]);

	const { wiggle, handleClean, handleWiggleEnd } = useFormCleaner(resetFields);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!taskMeta || taskMeta.missing) return;
		const trimmedTitle = title.trim();
		const trimmedDescription = description.trim();

		if (!trimmedTitle || !trimmedDescription || !endDate) {
			return;
		}

		updateTask({
			id: taskMeta.id,
			title: trimmedTitle,
			description: trimmedDescription,
			endDate,
			createdAt: taskMeta.createdAt,
			status: taskMeta.status,
		});
		navigate('/');
	};

	return (
		<TaskFormCard
			heading="Edit task"
			topRight={
				<TaskFormCancelLink to="/" ariaLabel="Close" label="Cancel" />
			}
			onSubmit={handleSubmit}
			footer={
				<>
					<button
						className="btn btn--primary"
						type="submit"
						disabled={taskMeta?.missing}
					>
						Done!
					</button>

					<TaskFormCleanButton
						wiggle={wiggle}
						onClick={handleClean}
						onAnimationEnd={handleWiggleEnd}
					/>
				</>
			}
		>
			{taskMeta?.missing ? (
				<p>
					Task not found. <Link to="/">Go back</Link>
				</p>
			) : (
				<TaskFields
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
				/>
			)}
		</TaskFormCard>
	);
}
