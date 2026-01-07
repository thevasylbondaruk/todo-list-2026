import './TaskForm.css';

export function TaskFormCard({
	heading,
	children,
	footer,
	onSubmit,
	topRight,
}) {
	return (
		<main className="page">
			<section className="card" aria-labelledby="task-form-heading">
				<header className="card__header">
					<h1 className="card__title" id="task-form-heading">
						{heading}
					</h1>
					{topRight}
				</header>

				<form className="form" onSubmit={onSubmit}>
					{children}

					<div className="actions" role="group" aria-label="Form actions">
						{footer}
					</div>
				</form>
			</section>
		</main>
	);
}
