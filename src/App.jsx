import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import HomeShell from './layouts/HomeShell';
import DefaultShell from './layouts/DefaultShell';

export default function App() {
	return (
		<Routes>
			<Route element={<HomeShell />}>
				<Route path="/" element={<HomePage />} />
			</Route>

			<Route element={<DefaultShell />}>
				<Route path="/add" element={<AddTaskPage />} />
				<Route path="/edit/:id" element={<EditTaskPage />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
