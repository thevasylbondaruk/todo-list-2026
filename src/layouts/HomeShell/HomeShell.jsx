import { Link, Outlet, useNavigate } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import { Header, Footer } from '../../components';
import './HomeShell.css';

export default function HomeShell() {
	const navigate = useNavigate();

	return (
		<div className="wrapper">
			<Header />
			<Outlet />
			<Footer>
				<div className="bottombar__fab-wrap">
					<Link
						onClick={() => navigate(paths.add)}
						className="bottombar__fab"
						aria-label="Add task"
					>
						+
					</Link>
				</div>
			</Footer>
		</div>
	);
}
