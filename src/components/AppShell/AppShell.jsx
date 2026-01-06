import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Topbar } from '../Topbar';

import './AppShell.css';

export default function AppShell() {
	return (
		<div className="wrapper">
			<Topbar />
			<Outlet />
			{/* <Footer /> */}
		</div>
	);
}
