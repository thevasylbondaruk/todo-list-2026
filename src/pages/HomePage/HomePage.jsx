import { useNavigate } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/trash-basket.svg?react';

import './HomePage.css';

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<main className="todo">
			<div className="todo__head">
				<div className="todo__count">777</div>

				<div className="search">
					<span className="search__icon" aria-hidden="true" />

					<input
						className="search__field"
						type="search"
						placeholder="Type to Search"
						aria-label="Search"
						// value={searchValue}
						// onChange={(event) => setSearchValue(event.target.value)}
					/>
				</div>
				<div className="select">
					<select
						className="select__field"
						aria-label="Filter todos"
						// value={filterValue}
						// onChange={(event) => setFilterValue(event.target.value)}
					>
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
					<input
						type="checkbox"
						aria-label="Toggle all"

						// onChange={(event) => handleToggleAll(event.target.checked)}
					/>
					<span aria-hidden="true" />
				</label>
				<p className="todo__data">Date</p>
				<p className="todo__data">Date End</p>
				<p className="todo__task">Title</p>
				<p className="todo__task">Description</p>
			</div>
			<ul className="table__list">
				<li className="table__row table__row--done">
					<label className="checkbox">
						<input
							type="checkbox"
							aria-label="Checkbox"
							// checked={task.status === 'done'}
							// disabled={task.status === 'deleted'}
							// onChange={(event) =>
							// 	handleToggleStatus(task.id, event.target.checked)
							// }
						/>
						<span aria-hidden="true" />
					</label>
					<p className="todo__task">{}</p>
					<p className="todo__task">{}</p>
					<p className="todo__data">{}</p>
					<p className="todo__data">{}</p>

					<EditIcon
						className="btn__icon-edit"
						onClick={() => navigate(paths.edit())}
					/>

					<button
						type="button"
						className="btn__icon"
						aria-label="Delete"
						// onClick={() => handleDelete(task.id)}
					>
						<DeleteIcon className="btn__icon-delete" />
					</button>
				</li>
			</ul>
		</main>
	);
}
