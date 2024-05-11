import React, { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Переключает видимость пароля
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<div className="register-container">
			<div className="register-box">
				<div className="register-header">Регистрация</div>
				<form className="register-form">
					<label htmlFor="email">Почта/Никнейм</label>
					<input
						type="email"
						id="email"
						placeholder="Введите логин..."
						className="register-form__email"
					/>
					<div className="register-form__password-field">
						<label
							htmlFor={isPasswordVisible ? "password" : "text"}
						>
							Пароль
						</label>
						<input
							type={isPasswordVisible ? "password" : "text"}
							id="password"
							placeholder="Введите пароль..."
							className="register-form__password"
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
					<div className="register-form__password-field">
						<label
							htmlFor={isPasswordVisible ? "password" : "text"}
						>
							Подтвердите пароль
						</label>
						<input
							type={isPasswordVisible ? "password" : "text"}
							id="password"
							placeholder="Повторите пароль..."
							className="register-form__password"
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
					<button type="submit">Войти</button>
					<div className="register-link">
						<p>
							Есть аккаунт ? <a href="#">Войдите в систему</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RegistrationForm;
