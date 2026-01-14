import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import ErrorPage from '../../assets/404-illustration.svg';
import './NotFoundPage.css';

export default function NotFoundPage() {
	return (
		<main className="status">
			<section className="status__card" role="status" aria-live="polite">
				<h1 className="status__title">404 — Page not found</h1>
				<p className="status__text">
					The page you are looking for doesn’t exist or has been moved.
				</p>
				<img src={ErrorPage} alt="404 error" />
				<Link to={paths.home} className="status__btn status__btn--primary">
					Go to Home
				</Link>
			</section>
		</main>
	);
}
