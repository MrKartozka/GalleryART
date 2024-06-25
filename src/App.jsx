import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken"); // Получаем accessToken из localStorage
		if (accessToken) {
			setIsAuthenticated(true); // Если токен существует, устанавливаем isAuthenticated в true
			setUserEmail(localStorage.getItem("userEmail")); // Устанавливаем email пользователя из localStorage
		}
	}, []); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз при монтировании компонента

	const handleLogout = () => {
		localStorage.clear(); // Очищаем localStorage при выходе из системы
		setIsAuthenticated(false); // Устанавливаем isAuthenticated в false
		setUserEmail(""); // Очищаем email пользователя
	};

	return (
		<Router>
			<AppRouter
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
				setUserEmail={setUserEmail}
				userEmail={userEmail}
				handleLogout={handleLogout}
			/>
		</Router>
	);
}

export default App;
