import logoSpinFast from '../../assets/logo-spin-fast.svg';
import logoSpinSlow from '../../assets/logo-spin-slow.svg';
import logo from '../../assets/logo.svg';

import './Header.css';

export function Header() {
	return (
		<header className="topbar">
			<div className="logo-badge">
				<img src={logo} alt="logo" className="logo-badge__logo" />
				<img
					src={logoSpinSlow}
					alt=""
					aria-hidden="true"
					className="logo-badge-slow__spin"
				/>
				<img
					src={logoSpinFast}
					alt=""
					aria-hidden="true"
					className="logo-badge-fast__spin"
				/>
			</div>
		</header>
	);
}
