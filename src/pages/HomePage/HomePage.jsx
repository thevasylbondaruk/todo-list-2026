import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/trash-basket.svg?react';
import {
	getCachedTasks,
	syncTasks,
	updateTask as repoUpdateTask,
	deleteTask as repoDeleteTask,
} from '../../repositories/tasksRepository';
import { formatShortDate } from '../../utils/data';

import s from './HomePage.module.scss';

export default function HomePage() {
	const [tasks, setTasks] = useState(() => getCachedTasks());

	const [loading, setLoading] = useState(tasks.length === 0);
	const [error, setError] = useState(null);

	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		let ignore = false;

		(async () => {
			try {
				setError(null);
				const fresh = await syncTasks(); // revalidate
				if (!ignore) setTasks(fresh);
			} catch (e) {
				if (!ignore) setError(e);
			} finally {
				if (!ignore) setLoading(false);
			}
		})();

		return () => {
			ignore = true;
		};
	}, []);

	const counts = tasks.reduce(
		(acc, task) => {
			acc.all += 1;
			if (task.status === 'done') acc.done += 1;
			else if (task.status === 'deleted') acc.deleted += 1;
			else acc.todo += 1;
			return acc;
		},
		{ all: 0, todo: 0, done: 0, deleted: 0 },
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
		(task) => task.status !== 'deleted',
	);

	const allVisibleDone =
		visibleToggleableTasks.length > 0 &&
		visibleToggleableTasks.every((task) => task.status === 'done');

	const toggleAllDisabled = visibleToggleableTasks.length === 0;

	const visibleToggleableIds = new Set(
		visibleToggleableTasks.map((task) => task.id),
	);

	const revalidateAfterError = async (e) => {
		setError(e);
		try {
			const fresh = await syncTasks();
			setTasks(fresh);
		} catch {
			//
		}
	};

	const handleToggleDone = async (taskId) => {
		const current = tasks.find((t) => t.id === taskId);
		if (!current || current.status === 'deleted') return;

		const nextStatus = current.status === 'done' ? 'todo' : 'done';

		setTasks((prev) =>
			prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t)),
		);

		try {
			const updated = await repoUpdateTask(taskId, { status: nextStatus });
			setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
		} catch (e) {
			await revalidateAfterError(e);
		}
	};

	const handleDelete = async (taskId) => {
		const current = tasks.find((t) => t.id === taskId);
		if (!current) return;

		if (current.status === 'deleted') {
			setTasks((prev) => prev.filter((t) => t.id !== taskId));

			try {
				await repoDeleteTask(taskId);
			} catch (e) {
				await revalidateAfterError(e);
			}
			return;
		}

		setTasks((prev) =>
			prev.map((t) => (t.id === taskId ? { ...t, status: 'deleted' } : t)),
		);

		try {
			const updated = await repoUpdateTask(taskId, { status: 'deleted' });
			setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
		} catch (e) {
			await revalidateAfterError(e);
		}
	};

	const handleToggleAll = async (checked) => {
		if (toggleAllDisabled) return;

		const nextStatus = checked ? 'done' : 'todo';
		const ids = [...visibleToggleableIds];

		setTasks((prev) =>
			prev.map((t) => {
				if (!visibleToggleableIds.has(t.id)) return t;
				if (t.status === 'deleted') return t;
				return { ...t, status: nextStatus };
			}),
		);

		try {
			await Promise.all(
				ids.map((id) => repoUpdateTask(id, { status: nextStatus })),
			);
			const fresh = await syncTasks();
			setTasks(fresh);
		} catch (e) {
			await revalidateAfterError(e);
		}
	};

	return (
		<>
			{loading ? <p style={{ padding: '8px 0' }}>Loading…</p> : null}
			{error ? (
				<p role="alert" style={{ padding: '8px 0' }}>
					Sync error (API may be unavailable). Showing cached data.
				</p>
			) : null}

			<div className={s.todoHead}>
				<div className={s.todoCount}>{taskCountLabel}</div>

				<div className={s.search}>
					<span className={s.searchIcon} aria-hidden="true" />

					<input
						className={s.searchField}
						type="search"
						placeholder="Type to Search"
						aria-label="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>

				<div className={s.select}>
					<select
						className={s.selectField}
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

			<hr className={s.todoDivider} />

			<div className={s.todoTable}>
				<label className={s.checkbox}>
					<input
						type="checkbox"
						aria-label="Toggle all"
						checked={allVisibleDone}
						disabled={toggleAllDisabled}
						onChange={(e) => handleToggleAll(e.target.checked)}
					/>
					<span aria-hidden="true" />
				</label>
				<p className={s.todoData}>Date</p>
				<p className={s.todoData}>Date End</p>
				<p className={s.todoTask}>Title</p>
				<p className={s.todoTask}>Description</p>
			</div>

			<ul className={s.tableList}>
				{visibleTasks.length === 0 ? (
					<li className={s.tableRowNoTasks}>
						<p>No tasks yet.</p>
					</li>
				) : (
					visibleTasks.map((task) => (
						<li
							key={task.id}
							className={`${s.tableRow} ${
								task.status === 'done' ? s.tableRowDone : ''
							}`}
						>
							<label className={s.checkbox}>
								<input
									type="checkbox"
									aria-label="Checkbox"
									checked={task.status === 'done'}
									disabled={task.status === 'deleted'}
									onChange={() => handleToggleDone(task.id)}
								/>
								<span aria-hidden="true" />
							</label>

							<p className={s.paragraph}>{formatShortDate(task.createdAt)}</p>
							<p className={s.paragraph}>{formatShortDate(task.endDate)}</p>
							<p className={s.paragraph}>{task.title}</p>
							<p className={s.paragraph}>{task.description}</p>

							{task.status !== 'deleted' ? (
								<Link
									to={paths.edit(task.id)}
									className={s.iconBtn}
									aria-label="Edit"
								>
									<EditIcon className={s.iconBtnEditIcon} />
								</Link>
							) : (
								<span aria-hidden="true" />
							)}

							<button
								type="button"
								className={s.iconBtn}
								aria-label="Delete"
								onClick={() => handleDelete(task.id)}
							>
								<DeleteIcon className={s.iconBtnDeleteIcon} />
							</button>
						</li>
					))
				)}
			</ul>
		</>
	);
}
