import { Link } from 'react-router-dom';
import Clean from '../assets/clean.svg?react';
import './style.add.css';

export default function AddTaskPage() {
	return (
		<>
			<main className="todo">
				<form action="" className="add__todo-content">
					<div>
						<button className="btn__clean" type="button">
							Clean
							<Clean className="btn__icon-сlean" />
						</button>
					</div>

					<div>
						<h2>Title</h2>
						<input type="text" placeholder="Enter task title" />
					</div>
					<div>
						<h2>Description</h2>
						<input type="text" placeholder="Enter task description" />
					</div>
					<div>
						<h2>Data end</h2>
						<input type="text" placeholder="Click hear to choose data" />
					</div>
					<button>Add</button>
					<Link to="/" type="button">
						Cancel
					</Link>
				</form>
			</main>
		</>
	);
}
