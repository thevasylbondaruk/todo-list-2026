import { Link } from 'react-router-dom';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/trash-basket.svg?react';
import './HomePage.css';

export default function HomePage() {
	return (
		<main className="todo">
			<div className="todo__head">
				<div className="todo__count">8 Todos</div>

				<div className="search">
					<span className="search__icon" aria-hidden="true" />

					<input
						className="search__field"
						type="search"
						placeholder="Type to Search"
						aria-label="Search"
					/>
				</div>
				<div className="select">
					<select className="select__field" aria-label="Filter todos">
						<option value="all">View all</option>
						<option value="todo">Todo</option>
						<option value="done">Done</option>
						<option value="deleted">Deleted</option>
					</select>
				</div>
			</div>
			<hr className="todo__divider" />
			<div className="todo__table">
				<label className="checkbox">
					<input type="checkbox" aria-label="Checkbox" />
					<span aria-hidden="true" />
				</label>
				<div className="todo__data">Date</div>
				<div className="todo__task">Task</div>
			</div>
			<ul className="table__list">
				<li className="table__row">
					<label className="checkbox">
						<input type="checkbox" aria-label="Checkbox" />
						<span aria-hidden="true" />
					</label>
					<div className="todo__data">9 Sep 2022</div>
					<div className="todo__task">Example task tod...</div>

					<Link to="/edit/:id" className="btn__icon" aria-label="Edit">
						<EditIcon className="btn__icon-edit" />
					</Link>
					<button type="button" className="btn__icon" aria-label="Delete">
						<DeleteIcon className="btn__icon-delete" />
					</button>
				</li>
			</ul>
		</main>
	);
}
