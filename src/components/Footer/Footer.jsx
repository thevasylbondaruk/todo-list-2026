import './Footer.css';

export function Footer({ children }) {
	return (
		<footer className="bottombar" aria-label="Footer">
			{children}
		</footer>
	);
}
