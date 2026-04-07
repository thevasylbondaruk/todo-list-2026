import logoRingFast from '../../assets/logo-spin-fast.svg';
import logoRingSlow from '../../assets/logo-spin-slow.svg';
import logo from '../../assets/logo.svg';
import { useTheme } from '../../shared/theme/useTheme';

import s from './Header.module.scss';

export function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={s.headerInner}>
			<div className={s.logoBadge}>
				<img src={logo} alt="logo" className={s.logoBadgeLogo} />
				<img
					src={logoRingSlow}
					alt=""
					aria-hidden="true"
					className={`${s.logoBadgeRing} ${s.logoBadgeRingSlow}`}
				/>
				<img
					src={logoRingFast}
					alt=""
					aria-hidden="true"
					className={`${s.logoBadgeRing} ${s.logoBadgeRingFast}`}
				/>
			</div>
			<button
				type="button"
				onClick={toggleTheme}
				className={s.themeToggle}
				role="switch"
				aria-checked={theme === 'dark'}
				aria-label={
					theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'
				}
			>
				<span className={s.themeToggleTrack} aria-hidden="true">
					<span className={s.themeToggleThumb}>
						{theme === 'dark' ? '🌙' : '☀️'}
					</span>
				</span>
			</button>
		</div>
	);
}
