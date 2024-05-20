import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import config from "../../config";
// import "./EmailConfirmation.css";

function EmailConfirmation() {
	const [confirmationStatus, setConfirmationStatus] = useState("");
	const query = new URLSearchParams(useLocation().search);
	const token = query.get("token");

	useEffect(() => {
		if (token) {
			confirmEmail();
		}
	}, [token]);

	const confirmEmail = async () => {
		try {
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

	return (
		<div className="confirmation-container">
			<div className="confirmation-box">
				<div className="confirmation-header">
					Подтверждение регистрации
				</div>
				<p>{confirmationStatus}</p>
			</div>
		</div>
	);
}

export default EmailConfirmation;
