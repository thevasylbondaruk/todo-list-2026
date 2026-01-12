import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../../components';
import './DefaultShell.css';

export default function DefaultShell() {
	return (
		<div className="wrapper">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
