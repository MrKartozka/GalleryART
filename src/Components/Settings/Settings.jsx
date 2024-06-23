import React, { useState, useEffect } from "react";
import "./Settings.css";
import { Link } from "react-router-dom";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import Dropzone from "react-dropzone";
import config from "../../config";
import axios from "axios";

function Settings({ userEmail, onLogout }) {
	const [file, setFile] = useState(null);
	const [imageId, setImageId] = useState(null);
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");

	const fetchUserData = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		try {
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userData = response.data;
			setUsername(userData.name);
			setDescription(userData.description);
			if (userData.image && userData.image.fullFilename) {
				localStorage.setItem(
					"profilePicture",
					userData.image.fullFilename
				);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const handleUpload = async (acceptedFiles) => {
		setFile(URL.createObjectURL(acceptedFiles[0]));

		const formData = new FormData();
		formData.append("file", acceptedFiles[0]);

		try {
			const response = await axios.post(config.uploadImageUrl, formData);
			console.log("Upload success:", response.data);
			setImageId(response.data.id);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const handleSave = async () => {
		const accessToken = localStorage.getItem("accessToken");

		const payload = {
			name: username || "Автор",
			description: description || "",
		};

		if (imageId) {
			payload.imageId = imageId;
		}

		try {
			const response = await axios.put(
				`${config.apiBaseUrl}/user/update`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log("Update success:", response.data);
			if (response.data.image && response.data.image.fullFilename) {
				localStorage.setItem(
					"profilePicture",
					response.data.image.fullFilename
				);
			}
			// Обновляем состояние описания и имя пользователя
			setUsername(payload.name);
			setDescription(payload.description);
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	const handleReset = () => {
		localStorage.removeItem("profilePicture");
		window.location.reload();
	};

	const getProfilePictureUrl = () => {
		const profilePicture = localStorage.getItem("profilePicture");
		if (!profilePicture) return "big-profile.png";

		const filenameParts = profilePicture.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	return (
		<>
			<NavigationBarWithoutFind
				userEmail={userEmail}
				onLogout={onLogout}
			/>
			<div className="settings">
				<div className="settings__container">
					<div className="settings__list">
						<Link to="/settings">
							<button className="settings__list-button edit-btn">
								Изменение профиля
							</button>
						</Link>
						<Link to="/account-management">
							<button className="settings__list-button manage-btn">
								Управление аккаунтом
							</button>
						</Link>
						<Link to="/profile-visibility">
							<button className="settings__list-button visibility-btn">
								Видимость профиля
							</button>
						</Link>
						<button className="settings__list-button safe-btn">
							Безопасность
						</button>
					</div>
					<div className="settings__profile">
						<div className="settings__texts">
							<h2 className="settings__texts-title">
								Изменение профиля
							</h2>
							<p className="settings__texts-description">
								Позаботьтесь о конфиденциальности личных данных.
								Добавляемая вами информация видна всем, кто
								может просматривать ваш профиль.
							</p>
						</div>
						<div className="settings__profile-edit">
							<p className="settings__profile-edit-text">
								Фотография
							</p>
							<div className="settings__profile-edit-box">
								<img
									className="settings__profile-edit-box-avatar"
									src={file || getProfilePictureUrl()}
									alt=""
									width="50px"
								/>
								<Dropzone onDrop={handleUpload}>
									{({ getRootProps, getInputProps }) => (
										<button
											{...getRootProps()}
											className="settings__profile-edit-box-change-btn"
										>
											<input {...getInputProps()} />
											Изменить
										</button>
									)}
								</Dropzone>
							</div>
						</div>
						<div className="settings__profile-box">
							<form action="" className="settings__profile-form">
								<label htmlFor="settings-change">
									Имя пользователя
									<input
										type="text"
										id="settings-change"
										placeholder='"Никнейм"'
										className="settings-description-input input-change"
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
									<p className="settings-change-footer">
										www.galleryart.ru/никнейм
									</p>
								</label>
								<label htmlFor="settings-description">
									Описание
									<textarea
										name=""
										id="settings-description"
										placeholder="Описание вашего чего-то"
										className="settings-description-input input-descr"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
									></textarea>
								</label>
								<label htmlFor="settings-website">
									Веб-сайт
									<input
										type="text"
										id="settings-website"
										placeholder="Добавьте сюда свою ссылку"
										className="settings-description-input input-web"
									/>
								</label>
								<button
									type="button"
									className="settings__profile-submit-btn"
									onClick={handleSave}
								>
									Сохранить
								</button>
								<button
									type="button"
									className="settings__profile-submit-btn"
									onClick={handleReset}
								>
									Сброс
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Settings;
