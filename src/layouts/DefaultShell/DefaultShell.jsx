import { Outlet, useMatches } from 'react-router-dom';

import { Footer, Header } from '../../components';

import s from './DefaultShell.module.scss';

export default function DefaultShell() {
	const matches = useMatches();

	const footerLink = [...matches].reverse().find((m) => m.handle?.footerLink)
		?.handle.footerLink;

	return (
		<div className={s.wrapper}>
			<header className={s.shellHeader}>
				<div className={s.container}>
					<Header />
				</div>
			</header>

			<main className={s.shellMain}>
				<div className={s.container}>
					<Outlet />
				</div>
			</main>

			<footer className={s.shellFooter} aria-label="Footer">
				<div className={s.container}>
					<Footer footerLink={footerLink} />
				</div>
			</footer>
		</div>
	);
}
