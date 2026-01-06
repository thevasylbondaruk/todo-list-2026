import { Outlet } from 'react-router-dom';
import { Topbar } from '../../components/Topbar';
import { Footer } from '../../components/Footer';
import './DefaultShell.css';

export default function DefaultShell() {
	return (
		<div className="wrapper">
			<Topbar />
			<Outlet />
			<Footer />
		</div>
	);
}
