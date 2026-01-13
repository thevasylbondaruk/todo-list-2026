import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import Clean from '../../assets/clean.svg?react';
import './TaskForm.css';

export function TaskFormCard({
	heading,
	onSubmit,
	button,
	onClick,
	onAnimationEnd,
	titleProps,
	descriptionProps,
	dateProps,
	wiggle,
}) {
	return (
		<main className="page">
			<section className="card" aria-labelledby="task-form-heading">
				<header className="card__header">
					<h1 className="card__title" id="task-form-heading">
						{heading}
					</h1>
					<Link to={paths.home} className="btn__cancel-top">
						Cancel
					</Link>
				</header>

				<form className="form" onSubmit={onSubmit}>
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

					<div className="actions" role="group" aria-label="Form actions">
						<button className="btn btn--primary" type="submit">
							{button}
						</button>

						<button
							type="button"
							className={`btn__clean ${wiggle ? 'is-wiggle' : ''}`}
							onClick={onClick}
							onAnimationEnd={onAnimationEnd}
						>
							Clean <Clean className="btn__icon-clean" />
						</button>
					</div>
				</form>
			</section>
		</main>
	);
}
