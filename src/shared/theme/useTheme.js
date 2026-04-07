import { useEffect, useState } from 'react';

import { setTheme, getStoredTheme } from './theme';

export function useTheme() {
	const [theme, setThemeState] = useState(() => {
		return (
			getStoredTheme() || document.documentElement.dataset.theme || 'light'
		);
	});

	useEffect(() => {
		setTheme(theme);
	}, [theme]);

	const toggleTheme = () => {
		setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));
	};

	return { theme, toggleTheme };
}
