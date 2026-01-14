import {
	apiCreateTask,
	apiDeleteTask,
	apiGetTask,
	apiListTasks,
	apiUpdateTask,
} from '../api/tasksApi';
import {
	isCacheStale,
	loadTasks,
	markFetchedNow,
	normalizeTask,
	removeTask,
	saveTasks,
	upsertTask,
} from '../shared/storage/tasksStorage';

const DEFAULT_TTL = 60_000;

/**
 * Адаптеры (если сервер хранит не так, как UI)
 * Если у вас на сервере уже status — оставьте как есть.
 */
function fromServer(task) {
	return normalizeTask(task);
}

function toServer(task) {
	// отправляем только то, что сервер ожидает
	// пример: { title, status }
	return task;
}

// Мгновенно отдать кэш
export function getCachedTasks() {
	return loadTasks();
}

/**
 * cache-first:
 * - если кэш есть и не протух — возвращаем кэш
 * - иначе грузим с сервера, кладём в кэш, возвращаем
 */

export async function getTasks({ ttlMs = DEFAULT_TTL, params } = {}) {
	const cached = loadTasks();

	if (cached.length > 0 && !isCacheStale(ttlMs)) {
		return cached;
	}

	const fresh = await apiListTasks(params);
	const normalized = Array.isArray(fresh) ? fresh.map(fromServer) : [];
	saveTasks(normalized);
	markFetchedNow();
	return normalized;
}

/**
 * Принудительная синхронизация:
 * - всегда идём в сеть и перезаписываем кэш
 */
export async function syncTasks(params) {
	const fresh = await apiListTasks(params);
	const normalized = Array.isArray(fresh) ? fresh.map(fromServer) : [];
	saveTasks(normalized);
	markFetchedNow();
	return normalized;
}

export async function getTaskById(id) {
	// сначала пробуем из кэша
	const cached = loadTasks().find((t) => t.id === id);
	if (cached) return cached;

	// иначе сеть
	const fresh = await apiGetTask(id);
	const normalized = fromServer(fresh);
	upsertTask(normalized);
	return normalized;
}

export async function createTask(taskDraft) {
	const created = await apiCreateTask(toServer(taskDraft));
	const normalized = fromServer(created);
	upsertTask(normalized);
	return normalized;
}

export async function updateTask(id, patch) {
	const updated = await apiUpdateTask(id, toServer(patch));
	const normalized = fromServer(updated);
	upsertTask(normalized);
	return normalized;
}

export async function deleteTask(id) {
	await apiDeleteTask(id);
	removeTask(id);
	return true;
}
