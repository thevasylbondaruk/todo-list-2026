import { TaskFormCard } from '../../components';

export default function AddTaskPage() {
	// const [value, setValue] = useState('');

	return (
		<TaskFormCard
			heading="Add task"
			// onSubmit={handleSubmit}
			titleProps={{
				placeholder: 'Enter task title',
				// value: title,
				// onChange: (e) => setTitle(e.target.value),
			}}
			descriptionProps={{
				placeholder: 'Enter task description',
				// value: description,
				// onChange: (e) => setDescription(e.target.value),
			}}
			dateProps={{
				// min: minDate,
				max: '9999-12-31',
				// value: endDate,
				// onChange: (e) => setEndDate(e.target.value),
				// onBlur: handleDateBlur,
			}}
			button="Add"
			// wiggle={wiggle}
			// onClick={handleClean}
			// onAnimationEnd={handleWiggleEnd}
		/>
	);
}
