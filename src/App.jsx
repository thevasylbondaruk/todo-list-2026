import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
// import AppShell from './components/AppShell';

export default function App() {
	return (
		<Routes>
			{/* <Route element={AppShell}> */}
			<Route path="/" element={<HomePage />} />
			<Route path="/add" element={<AddTaskPage />} />
			<Route path="/edit" element={<EditTaskPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
			{/* </Route> */}
		</Routes>
	);
}
