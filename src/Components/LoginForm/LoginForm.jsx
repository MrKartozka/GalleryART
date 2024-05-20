import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import "./LoginForm.css";

function LoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `${config.apiBaseUrl}/auth/login`;
		console.log("Login URL:", url);

		try {
			// Debugging: Log the payload
			console.log("Payload:", { login, password });

			const response = await axios.post(
				url,
				{
					login, // Use 'login' if that's what your backend expects
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
						accept: "*/*",
					},
				}
			);

			console.log("Login successful", response.data);

			// Store the JWT tokens
			const accessToken = response.data.accessToken;
			const refreshToken = response.data.refreshToken;
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			// Optionally, verify the user by calling a protected endpoint
			const userResponse = await axios.get(
				`${config.apiBaseUrl}/auth/logged-user`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log("User data:", userResponse.data);

			// Handle successful login (e.g., redirect to dashboard)
		} catch (error) {
			// Debugging: Log the error
			console.error("Error during login", error);
			setError("Ошибка при входе");
		}
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<img src="blackGuy.png" alt="" className="login-character" />
				<div className="login-header">Вход в систему</div>
				<form className="login-form" onSubmit={handleSubmit}>
					{error && <div className="error">{error}</div>}
					<label htmlFor="login">Почта/Никнейм</label>
					<input
						type="text"
						id="login"
						placeholder="Введите логин..."
						className="login-form__email"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
					<div className="login-form__password-field">
						<label htmlFor="password">Пароль</label>
						<input
							type={isPasswordVisible ? "text" : "password"}
							id="password"
							placeholder="Введите пароль..."
							className="login-form__password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<img
							src={
								isPasswordVisible
									? "closeEye.png"
									: "openEye.png"
							}
							alt="toggle visibility"
							onClick={togglePasswordVisibility}
						/>
					</div>
					<div className="form-footer">
						<div className="checkbox-container">
							<input type="checkbox" id="remember-me" />
							<label htmlFor="remember-me">Запомнить меня</label>
						</div>
						<a href="#" className="forgot-password">
							Забыли пароль?
						</a>
					</div>
					<button type="submit">Войти</button>
					<div className="register-link">
						<p>
							Нет аккаунта ? <a href="#">Зарегистрируйтесь</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
