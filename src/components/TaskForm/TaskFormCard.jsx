import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import Clean from '../../assets/clean.svg?react';

import s from './TaskForm.module.scss';

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
		<div className={s.pageCenter}>
			<section className={s.card} aria-labelledby="task-form-heading">
				<header className={s.cardHeader}>
					<h1 className={s.cardTitle} id="task-form-heading">
						{heading}
					</h1>
					<Link to={paths.home} className={s.btnCancelTop}>
						Cancel
					</Link>
				</header>

				<form className={s.form} onSubmit={onSubmit}>
					<div className={s.field}>
						<label className={s.fieldLabel} htmlFor="task-title">
							Title
						</label>
						<input
							className={s.fieldControl}
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
					<div className={s.field}>
						<label className={s.fieldLabel} htmlFor="task-desc">
							Description
						</label>
						<textarea
							className={s.fieldControl}
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
					<div className={s.field}>
						<label className={s.fieldLabel} htmlFor="task-end">
							Date end
						</label>
						<input
							className={s.fieldControl}
							name="endDate"
							type="date"
							max="9999-12-31"
							required
							{...dateProps}
							id="task-end"
						/>
					</div>

					<div className={s.actions} role="group" aria-label="Form actions">
						<button className={`${s.btn} ${s.btnPrimary}`} type="submit">
							{button}
						</button>

						<button
							type="button"
							className={`${s.btnClean} ${wiggle ? s.isWiggle : ''}`}
							onClick={onClick}
							onAnimationEnd={onAnimationEnd}
						>
							Clean <Clean className={s.btnIconClean} />
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
