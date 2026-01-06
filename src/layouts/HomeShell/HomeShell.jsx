import { Link, Outlet } from 'react-router-dom';
import { Topbar } from '../../components/Topbar';
import { Footer } from '../../components/Footer';
import './HomeShell.css';

export default function HomeShell() {
	return (
		<div className="wrapper">
			<Topbar />
			<Outlet />
			<Footer>
				<div className="bottombar__fab-wrap">
					<Link to="/add" className="bottombar__fab" aria-label="Add task">
						+
					</Link>
				</div>
			</Footer>
		</div>
	);
}
