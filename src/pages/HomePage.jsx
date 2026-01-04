import logo from '../assets/logo.svg';
import logoSpinSlow from '../assets/logo-spin-slow.svg';
import logoSpinFast from '../assets/logo-spin-fast.svg';
import EditIcon from '../assets/edit.svg?react';
import DeleteIcon from '../assets/trash-basket.svg?react';

import './style.css';

export function HomePage() {
	return (
		<div class="wrapper">
			<header className="topbar">
				<div className="logo-badge" aria-hidden="true">
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

			<main className="todo">
				<div className="todo__head">
					<div className="todo__count">8 Todos</div>
					<a className="todo__link" href="#">
						View all
					</a>
				</div>
				<hr className="todo__divider" />
				<div className="todo__table">
					<div className="todo__cell">
						<input className="todo__checkbox" type="checkbox" />
					</div>
					<div className="todo__data">Date</div>
					<div className="todo__task">Task</div>
				</div>
				<ul className="table__list">
					<li className="table__row">
						<div className="todo__cell">
							<input className="todo__checkbox" type="checkbox" />
						</div>
						<div className="todo__data">9 Sep 2022</div>
						<div className="todo__task">Example task tod...</div>

						<button className="btn__icon">
							<EditIcon className="btn__icon-edit" />
						</button>
						<button className="btn__icon">
							<DeleteIcon className="btn__icon-delete" />
						</button>
					</li>
				</ul>
				<button className="todo__load-more">Load more ...</button>
			</main>

			<footer className="bottombar">
				<div className="bottombar__fab-wrap">
					<button
						className="bottombar__fab"
						type="button"
						aria-label="Add task"
					>
						+
					</button>
				</div>
			</footer>
		</div>
	);
}
