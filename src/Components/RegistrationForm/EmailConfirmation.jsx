import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import "./EmailConfirmation.css";

function EmailConfirmation({ show, handleClose, token }) {
	const [confirmationStatus, setConfirmationStatus] = useState("");

	// Функция для подтверждения email
	const confirmEmail = async () => {
		try {
			// Выполняем GET-запрос для подтверждения email
			const response = await axios.get(
				`${config.apiBaseUrl}/auth/confirm`,
				{
					params: { token },
				}
			);
			setConfirmationStatus("Регистрация завершена успешно!");
		} catch (error) {
			setConfirmationStatus("Ошибка подтверждения регистрации.");
		}
	};

	if (!show) {
		return null; // Если show равно false, не отображаем компонент
	}

	return (
		<div className="modal" onClick={handleClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h4 className="modal-title">Подтверждение регистрации</h4>
				</div>
				<div className="modal-body">
					<p>
						{confirmationStatus ||
							"Пожалуйста, подтвердите ваш email, перейдя по ссылке в письме, а затем нажмите кнопку ниже."}
					</p>
				</div>
				<div className="modal-footer">
					<button onClick={confirmEmail}>Подтвердить Email</button>
					<button onClick={handleClose}>Закрыть</button>
				</div>
			</div>
		</div>
	);
}

export default EmailConfirmation;
