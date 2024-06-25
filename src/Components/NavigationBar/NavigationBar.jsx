import "./NavigationBar.css";
import { Link } from "react-router-dom";

// Компонент NavigationBar отображает навигационную панель
function NavigationBar({ isAuthenticated }) {
	return (
		<div className="nav">
			<div className="nav-container">
				<div className="nav__logo">Gallery Art</div>
				<div
					className={`search-field ${
						isAuthenticated ? "centered" : ""
					}`}
				>
					<input
						type="text"
						name=""
						id=""
						placeholder="Поиск картинки"
					/>
				</div>
				{isAuthenticated && <img src="" alt="" />}{" "}
				{/* Иконка для аутентифицированных пользователей */}
				{!isAuthenticated && (
					<Link to="/login">
						<button className="nav-login">Вход</button>
					</Link>
				)}
			</div>
		</div>
	);
}

export default NavigationBar;
