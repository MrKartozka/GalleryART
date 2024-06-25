import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import config from "../../config";
import EmailConfirmation from "./EmailConfirmation";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [token, setToken] = useState("");
	const navigate = useNavigate(); // Инициализируем хук навигации

	// Функция для переключения видимости пароля
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			// Проверяем, совпадают ли пароли
			setError("Пароли не совпадают");
			return;
		}

		try {
			// Выполняем POST-запрос для регистрации пользователя
			const response = await axios.post(`${config.apiBaseUrl}/auth/reg`, {
				login,
				password,
			});
			console.log("Registration successful", response.data);
			setToken(response.data.token); // Сохраняем токен из ответа
			setShowModal(true); // Показываем модальное окно для подтверждения Email
		} catch (error) {
			console.error("Error during registration", error);
			setError("Ошибка при регистрации"); // Устанавливаем сообщение об ошибке
		}
	};

	// Обработчик закрытия модального окна подтверждения Email
	const handleEmailConfirmationClose = () => {
		setShowModal(false);
		navigate("/login");
	};

	return (
		<div className="register-container">
			<div className="register-box">
				<div className="register-header">Регистрация</div>
				<form className="register-form" onSubmit={handleSubmit}>
					{error && <div className="error">{error}</div>}
					<label htmlFor="login">Почта/Никнейм</label>
					<input
						type="text"
						id="login"
						placeholder="Введите логин..."
						className="register-form__email"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
					<div className="register-form__password-field">
						<label htmlFor="password">Пароль</label>
						<input
							type={isPasswordVisible ? "text" : "password"}
							id="password"
							placeholder="Введите пароль..."
							className="register-form__password"
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
					<div className="register-form__password-field">
						<label htmlFor="confirmPassword">
							Подтвердите пароль
						</label>
						<input
							type={isPasswordVisible ? "text" : "password"}
							id="confirmPassword"
							placeholder="Повторите пароль..."
							className="register-form__password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
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
					<button type="submit">Зарегистрироваться</button>
					<div className="register-link">
						<p>
							Есть аккаунт ?{" "}
							<a href="/login">Войдите в систему</a>
						</p>
					</div>
				</form>
			</div>
			<EmailConfirmation
				show={showModal}
				handleClose={handleEmailConfirmationClose}
				token={token}
			/>
		</div>
	);
}

export default RegistrationForm;
