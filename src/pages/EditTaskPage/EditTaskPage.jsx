import { TaskFormCard } from '../../components';

export default function EditTaskPage() {
	return (
		<TaskFormCard
			heading="Edit task"
			// onSubmit={handleSubmit}
			titleProps={
				{
					// value: title,
					// onChange: (e) => setTitle(e.target.value),
				}
			}
			descriptionProps={
				{
					// value: description,
					// onChange: (e) => setDescription(e.target.value),
				}
			}
			dateProps={{
				// min: minDate,
				max: '9999-12-31',
				// value: endDate,
				// onChange: (e) => setEndDate(e.target.value),
				// onBlur: handleDateBlur,
			}}
			button="Done"
			// wiggle={wiggle}
			// onClick={handleClean}
			// onAnimationEnd={handleWiggleEnd}
		/>
	);
}
