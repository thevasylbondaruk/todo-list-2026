import { useMemo } from 'react';
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
		: { missing: true };

	const { wiggle, handleClean, handleWiggleEnd } = useFormCleaner(resetFields);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskMeta.missing) return;
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
						disabled={taskMeta.missing}
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
			{taskMeta.missing ? (
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
