const STORAGE_KEY = 'tasks';
const META_KEY = 'tasks.meta';

export function loadMeta() {
	try {
		const raw = localStorage.getItem(META_KEY);
		return raw ? JSON.parse(raw) : { fetchedAt: 0 };
	} catch {
		return { fetchedAt: 0 };
	}
}

export function saveMeta(patch) {
	const prev = loadMeta();
	localStorage.setItem(META_KEY, JSON.stringify({ ...prev, ...patch }));
}

export function isCacheStale(ttlMs) {
	const { fetchedAt } = loadMeta();
	return !fetchedAt || Date.now() - fetchedAt > ttlMs;
}

export function markFetchedNow() {
	saveMeta({ fetchedAt: Date.now() });
}

//

export function upsertTask(task) {
	const normalized = normalizeTask(task);
	const tasks = loadTasks();
	const idx = tasks.findIndex((t) => t.id === normalized.id);

	let next;
	if (idx === -1) {
		next = [normalized, ...tasks];
	} else {
		next = tasks.map((t, i) => (i === idx ? { ...t, ...normalized } : t));
	}

	saveTasks(next);
	return next;
}

export function removeTask(id) {
	const tasks = loadTasks();
	const next = tasks.filter((t) => t.id !== id);
	saveTasks(next);
	return next;
}

//

export function normalizeTask(task) {
	return { ...task, status: task.status ?? 'todo' };
}

export function loadTasks() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		const list = Array.isArray(parsed)
			? parsed.filter((task) => task && typeof task === 'object')
			: [];
		return list.map(normalizeTask);
	} catch {
		return [];
	}
}

export function saveTasks(tasks) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function saveTask(task) {
	const tasks = loadTasks();
	tasks.unshift(normalizeTask(task));
	saveTasks(tasks);
}

export function updateTask(updatedTask) {
	const tasks = loadTasks();
	const next = tasks.map((task) =>
		task.id === updatedTask.id
			? normalizeTask({ ...task, ...updatedTask })
			: task
	);
	saveTasks(next);
	return next;
}

export function createTaskId() {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
