import { useState } from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/trash-basket.svg?react';
import { formatShortDate } from '../../utils/data';
import {
	loadTasks,
	normalizeTask,
	saveTasks,
} from '../../shared/storage/tasksStorage';

import './HomePage.css';

export default function HomePage() {
	const [tasks, setTasks] = useState(() => loadTasks());
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('all');

	const counts = tasks.reduce(
		(acc, task) => {
			acc.all += 1;
			if (task.status === 'done') acc.done += 1;
			else if (task.status === 'deleted') acc.deleted += 1;
			else acc.todo += 1;
			return acc;
		},
		{ all: 0, todo: 0, done: 0, deleted: 0 }
	);

	const formatTodo = (value) => `${value} Todo${value === 1 ? '' : 's'}`;
	let taskCountLabel = formatTodo(counts.all);
	if (filter === 'done') taskCountLabel = `${counts.done} Done`;
	else if (filter === 'deleted') taskCountLabel = `${counts.deleted} Deleted`;
	else if (filter === 'todo') taskCountLabel = formatTodo(counts.todo);

	const loweredQuery = query.trim().toLowerCase();
	const visibleTasks = tasks.filter((task) => {
		if (filter !== 'all' && task.status !== filter) return false;
		if (!loweredQuery) return true;
		return (
			(task.title ?? '').toLowerCase().includes(loweredQuery) ||
			(task.description ?? '').toLowerCase().includes(loweredQuery)
		);
	});

	const visibleToggleableTasks = visibleTasks.filter(
		(task) => task.status !== 'deleted'
	);

	const allVisibleDone =
		visibleToggleableTasks.length > 0 &&
		visibleToggleableTasks.every((task) => task.status === 'done');

	const toggleAllDisabled = visibleToggleableTasks.length === 0;

	const visibleToggleableIds = new Set(
		visibleToggleableTasks.map((task) => task.id)
	);

	const updateTasks = (updater) => {
		setTasks((prev) => {
			const next = updater(prev).map(normalizeTask);
			saveTasks(next);
			return next;
		});
	};

	const handleToggleDone = (taskId) => {
		updateTasks((prev) =>
			prev.map((task) => {
				if (task.id !== taskId) return task;
				return {
					...task,
					status: task.status === 'done' ? 'todo' : 'done',
				};
			})
		);
	};

	const handleDelete = (taskId) => {
		updateTasks((prev) =>
			prev.flatMap((task) => {
				if (task.id !== taskId) return [task];
				if (task.status === 'deleted') return [];
				return [{ ...task, status: 'deleted' }];
			})
		);
	};

	const handleToggleAll = (checked) => {
		if (toggleAllDisabled) return;
		updateTasks((prev) =>
			prev.map((task) => {
				if (!visibleToggleableIds.has(task.id)) return task;
				return { ...task, status: checked ? 'done' : 'todo' };
			})
		);
	};

	return (
		<main className="todo">
			<div className="todo__head">
				<div className="todo__count">{taskCountLabel}</div>

				<div className="search">
					<span className="search__icon" aria-hidden="true" />

					<input
						className="search__field"
						type="search"
						placeholder="Type to Search"
						aria-label="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<div className="select">
					<select
						className="select__field"
						aria-label="Filter todos"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
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
						checked={allVisibleDone}
						disabled={toggleAllDisabled}
						onChange={(e) => handleToggleAll(e.target.checked)}
					/>
					<span aria-hidden="true" />
				</label>
				<p className="todo__data">Date</p>
				<p className="todo__data">Date End</p>
				<p className="todo__task">Title</p>
				<p className="todo__task">Description</p>
			</div>
			<ul className="table__list">
				{visibleTasks.length === 0 ? (
					<li className="table__row table__row--column">
						<p className="todo__task">No tasks yet.</p>
					</li>
				) : (
					visibleTasks.map((task) => (
						<li
							key={task.id}
							className={`table__row ${
								task.status === 'done' ? 'table__row--done' : ''
							}`}
						>
							<label className="checkbox">
								<input
									type="checkbox"
									aria-label="Checkbox"
									checked={task.status === 'done'}
									disabled={task.status === 'deleted'}
									onChange={() => handleToggleDone(task.id)}
								/>
								<span aria-hidden="true" />
							</label>
							<p className="todo__data">{formatShortDate(task.createdAt)}</p>
							<p className="todo__data">{formatShortDate(task.endDate)}</p>
							<p className="todo__task">{task.title}</p>
							<p className="todo__task">{task.description}</p>
							{task.status !== 'deleted' ? (
								<Link
									to={paths.edit(task.id)}
									className="btn__icon"
									aria-label="Edit"
								>
									<EditIcon className="btn__icon-edit" />
								</Link>
							) : (
								<span aria-hidden="true" />
							)}
							<button
								type="button"
								className="btn__icon"
								aria-label="Delete"
								onClick={() => handleDelete(task.id)}
							>
								<DeleteIcon className="btn__icon-delete" />
							</button>
						</li>
					))
				)}
			</ul>
		</main>
	);
}
