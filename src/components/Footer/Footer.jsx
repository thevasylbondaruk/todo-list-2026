import { Link } from 'react-router-dom';

import ButtonFooter from '../../assets/plus-button.svg?react';

import s from './Footer.module.scss';

export function Footer({ footerLink }) {
	return (
		<div className={s.bottombarFabWrap}>
			{footerLink ? (
				<Link to={footerLink.to} aria-label="Add task" className={s.fabLink}>
					<ButtonFooter className={s.bottombarFab} />
				</Link>
			) : null}
		</div>
	);
}
