import { createBrowserRouter } from 'react-router-dom';

import { DefaultShell, HomeShell } from '../../layouts';
import { HomePage, AddTaskPage, EditTaskPage, NotFoundPage } from '../../pages';

import { paths } from './paths';

export const router = createBrowserRouter([
	{
		element: <HomeShell />,
		children: [{ path: paths.home, element: <HomePage /> }],
	},
	{
		element: <DefaultShell />,
		children: [
			{ path: paths.add, element: <AddTaskPage /> },
			{ path: paths.edit(), element: <EditTaskPage /> },
		],
	},
	{ path: '*', element: <NotFoundPage /> },
]);
