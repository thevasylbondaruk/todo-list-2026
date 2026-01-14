import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 15000,
	headers: { Accept: 'application/json' },
});

const RESOURCE = '/tasks';

export async function apiListTasks(params) {
	const res = await api.get(RESOURCE, { params });
	return res.data;
}

export async function apiGetTask(id) {
	const res = await api.get(`${RESOURCE}/${id}`);
	return res.data;
}

export async function apiCreateTask(payload) {
	const res = await api.post(RESOURCE, payload);
	return res.data;
}

export async function apiUpdateTask(id, patch) {
	const res = await api.patch(`${RESOURCE}/${id}`, patch);
	return res.data;
}

export async function apiDeleteTask(id) {
	await api.delete(`${RESOURCE}/${id}`);
	return true;
}
