import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			setIsAuthenticated(true);
			setUserEmail(localStorage.getItem("userEmail"));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("userEmail");
		setIsAuthenticated(false);
		setUserEmail("");
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
