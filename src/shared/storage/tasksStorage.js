const STORAGE_KEY = 'tasks';

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
