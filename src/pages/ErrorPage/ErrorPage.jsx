import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import { paths } from '../../app/router/paths';

import s from './ErrorPage.module.scss';

export default function ErrorPage() {
	const error = useRouteError();

	let title = 'Something went wrong';
	let message =
		'An unexpected error occurred. Try reloading the page or come back later.';
	let code = '500';

	if (isRouteErrorResponse(error)) {
		code = String(error.status);
		title = `${code} — ${error.statusText}`;
		message =
			typeof error.data === 'string'
				? error.data
				: (error.data?.message ?? message);
	} else if (error instanceof Error) {
		message = error.message || message;
	}

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<main className={s.pageCenter}>
			<section className={s.card} role="alert" aria-live="assertive">
				<div className="status__code">{code}</div>
				<h1 className={s.title}>{title}</h1>
				<p className={s.text}>{message}</p>

				<div className="status__actions">
					<button
						type="button"
						className={`${s.btn} ${s.btnPrimary}`}
						onClick={handleReload}
					>
						Reload
					</button>
					<Link to={paths.home} className={`${s.btn} ${s.btnPrimary}`}>
						Go to Home
					</Link>
				</div>
			</section>
		</main>
	);
}
