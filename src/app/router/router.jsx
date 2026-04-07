import { createBrowserRouter } from 'react-router-dom';

import DefaultShell from '../../layouts/DefaultShell';
import {
	HomePage,
	AddTaskPage,
	EditTaskPage,
	NotFoundPage,
	ErrorPage,
} from '../../pages';

import { paths } from './paths';

export const router = createBrowserRouter([
	{
		element: <DefaultShell />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: paths.home,
				element: <HomePage />,
				handle: { footerLink: { to: paths.add, label: 'Добавить кнопку ' } },
			},
			{ path: paths.add, element: <AddTaskPage /> },
			{ path: paths.edit(), element: <EditTaskPage /> },
			{ path: '*', element: <NotFoundPage /> },
		],
	},
]);

// loader: async () => {
// имитация серверной ошибки
// throw new Response('Server error', {
// 	status: 500,
// 	statusText: 'Internal Server Error',
// });
// или просто: throw new Error("Boom");
// },
