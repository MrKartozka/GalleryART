import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Переключает видимость пароля
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<img src="blackGuy.png" alt="" className="login-character" />

				<div className="login-header">Вход в систему</div>
				<form className="login-form">
					<label htmlFor="email">Почта/Никнейм</label>
					<input
						type="email"
						id="email"
						placeholder="Введите логин..."
						className="login-form__email"
					/>
					<div className="login-form__password-field">
						<label
							htmlFor={isPasswordVisible ? "password" : "text"}
						>
							Пароль
						</label>
						<input
							type={isPasswordVisible ? "password" : "text"}
							id="password"
							placeholder="Введите пароль..."
							className="login-form__password"
						/>
						<img
							src={
								isPasswordVisible
									? "closeEye.png"
									: "openEye.png"
							}
							alt="close eye"
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
