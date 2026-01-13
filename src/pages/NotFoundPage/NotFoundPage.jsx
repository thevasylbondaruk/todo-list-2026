import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';

export default function NotFoundPage() {
	return (
		<main className="status">
			<section className="status__card" role="status" aria-live="polite">
				<h1 className="status__title">404 — Page not found</h1>
				<p className="status__text">
					The page you are looking for doesn’t exist or has been moved.
				</p>

				<div className="status__actions">
					<Link to={paths.home} className="btn btn--primary">
						Go to Home
					</Link>
					<Link to={paths.add} className="btn btn--ghost">
						Add task
					</Link>
				</div>
			</section>
		</main>
	);
}
