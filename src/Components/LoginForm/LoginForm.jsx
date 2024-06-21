import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setIsAuthenticated, setUserEmail }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `${config.apiBaseUrl}/auth/login`;
		console.log("Login URL:", url);

		try {
			const response = await axios.post(
				url,
				{ login, password },
				{
					headers: {
						"Content-Type": "application/json",
						accept: "*/*",
					},
				}
			);

			console.log("Login successful", response.data);

			const accessToken = response.data.accessToken;
			const refreshToken = response.data.refreshToken;
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("userEmail", login);

			// Fetch user data
			const userResponse = await axios.get(
				`${config.apiBaseUrl}/auth/logged-user`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const userId = userResponse.data.id;
			localStorage.setItem("userId", userId);

			setIsAuthenticated(true);
			setUserEmail(login);

			navigate("/gallery");
		} catch (error) {
			console.error("Error during login", error);
			setError("Ошибка при входе");
		}
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<Link to="/gallery">
					<img
						className="login-back"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Iconoir_arrow-left-circled.svg/1200px-Iconoir_arrow-left-circled.svg.png"
						alt=""
						width="32"
					/>
				</Link>
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
							Нет аккаунта ?{" "}
							<a href="/register">Зарегистрируйтесь</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
