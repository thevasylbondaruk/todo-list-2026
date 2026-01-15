import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import ErrorPage from '../../assets/404-illustration.svg';

import s from './NotFoundPage.module.scss';

export default function NotFoundPage() {
	return (
		<main className={s.status}>
			<section className={s.card}>
				<h1 className={s.title}>404 — Page not found</h1>
				<p className={s.text}>
					The page you are looking for doesn’t exist or has been moved.
				</p>
				<img
					src={ErrorPage}
					alt="Illustration of a 404 page"
					aria-hidden="true"
				/>
				<Link to={paths.home} className={`${s.btn} ${s.btnPrimary}`}>
					Go to Home
				</Link>
			</section>
		</main>
	);
}
