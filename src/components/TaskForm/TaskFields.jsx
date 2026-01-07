import './TaskForm.css';

export function TaskFields({ titleProps, descriptionProps, dateProps }) {
	return (
		<>
			<div className="field">
				<label className="field__label" htmlFor="task-title">
					Title
				</label>
				<input
					className="field__control"
					name="title"
					type="text"
					placeholder="Enter task title"
					autoComplete="off"
					required
					minLength={3}
					maxLength={15}
					{...titleProps}
					id="task-title"
				/>
			</div>
			<div className="field">
				<label className="field__label" htmlFor="task-desc">
					Description
				</label>
				<textarea
					className="field__control"
					name="description"
					placeholder="Enter task description"
					rows="3"
					required
					minLength={5}
					maxLength={200}
					{...descriptionProps}
					id="task-desc"
				/>
			</div>
			<div className="field">
				<label className="field__label" htmlFor="task-end">
					Date end
				</label>
				<input
					className="field__control"
					name="endDate"
					type="date"
					max="9999-12-31"
					required
					{...dateProps}
					id="task-end"
				/>
			</div>
		</>
	);
}
