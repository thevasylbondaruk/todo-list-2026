import { Link } from 'react-router-dom';
import Clean from '../../assets/clean.svg?react';

export function TaskFormCancelLink({ to = '/', label = 'Cancel', ariaLabel }) {
	return (
		<Link to={to} className="btn__cancel-top" aria-label={ariaLabel ?? label}>
			{label}
		</Link>
	);
}

export function TaskFormCleanButton({
	wiggle,
	onClick,
	onAnimationEnd,
	label = 'Clean',
}) {
	return (
		<button
			type="button"
			className={`btn__clean ${wiggle ? 'is-wiggle' : ''}`}
			onClick={onClick}
			onAnimationEnd={onAnimationEnd}
		>
			{label} <Clean className="btn__icon-clean" />
		</button>
	);
}
