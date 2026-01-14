import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../app/router/paths';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/trash-basket.svg?react';
// без пробела в пути + алиасы, чтобы не путаться
import {
	getCachedTasks,
	syncTasks,
	updateTask as repoUpdateTask,
	deleteTask as repoDeleteTask,
} from '../../repositories/tasksRepository';
import { formatShortDate } from '../../utils/data';

import './HomePage.css';

export default function HomePage() {
	// 1) мгновенно отрисуем кэш
	const [tasks, setTasks] = useState(() => getCachedTasks());

	// 2) состояния для синхронизации
	const [loading, setLoading] = useState(tasks.length === 0);
	const [error, setError] = useState(null);

	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('all');

	// 3) при маунте: подтянуть свежие с сервера (если сервер есть)
	useEffect(() => {
		let ignore = false;

		(async () => {
			try {
				setError(null);
				const fresh = await syncTasks(); // revalidate
				if (!ignore) setTasks(fresh);
			} catch (e) {
				// если API нет — вы останетесь на кэше, просто будет error
				if (!ignore) setError(e);
			} finally {
				if (!ignore) setLoading(false);
			}
		})();

		return () => {
			ignore = true;
		};
	}, []);

	// ====== ваши вычисления UI (как было) ======
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

	// ====== handlers через репозиторий ======

	// helper: если сеть упала — пробуем восстановиться синком
	const revalidateAfterError = async (e) => {
		setError(e);
		try {
			const fresh = await syncTasks();
			setTasks(fresh);
		} catch {
			// оставляем кэш как есть
		}
	};

	const handleToggleDone = async (taskId) => {
		const current = tasks.find((t) => t.id === taskId);
		if (!current || current.status === 'deleted') return;

		const nextStatus = current.status === 'done' ? 'todo' : 'done';

		// оптимистично в UI
		setTasks((prev) =>
			prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t))
		);

		try {
			const updated = await repoUpdateTask(taskId, { status: nextStatus });
			// привести UI к тому, что вернул сервер
			setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
		} catch (e) {
			await revalidateAfterError(e);
		}
	};

	// мягкое удаление: 1 клик -> status deleted
	// если уже deleted -> реально DELETE
	const handleDelete = async (taskId) => {
		const current = tasks.find((t) => t.id === taskId);
		if (!current) return;

		// 2-й клик по deleted — физически удаляем
		if (current.status === 'deleted') {
			// оптимистично убрать из UI
			setTasks((prev) => prev.filter((t) => t.id !== taskId));

			try {
				await repoDeleteTask(taskId);
			} catch (e) {
				await revalidateAfterError(e);
			}
			return;
		}

		// 1-й клик — пометить deleted
		setTasks((prev) =>
			prev.map((t) => (t.id === taskId ? { ...t, status: 'deleted' } : t))
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

		// оптимистично
		setTasks((prev) =>
			prev.map((t) => {
				if (!visibleToggleableIds.has(t.id)) return t;
				if (t.status === 'deleted') return t;
				return { ...t, status: nextStatus };
			})
		);

		try {
			// чтобы не писать сложную “склейку” результатов — после пачки просто синхронизируем
			await Promise.all(
				ids.map((id) => repoUpdateTask(id, { status: nextStatus }))
			);
			const fresh = await syncTasks();
			setTasks(fresh);
		} catch (e) {
			await revalidateAfterError(e);
		}
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

			{/* (опционально) вывод состояния синка */}
			{loading ? <p style={{ padding: '8px 0' }}>Loading…</p> : null}
			{error ? (
				<p role="alert" style={{ padding: '8px 0' }}>
					Sync error (API may be unavailable). Showing cached data.
				</p>
			) : null}

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
