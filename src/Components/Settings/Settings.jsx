import React, { useState } from "react";
import "./Settings.css";
import { Link } from "react-router-dom";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import Dropzone from "react-dropzone";
import config from "../../config";

function Settings({ userEmail, onLogout }) {
	const [file, setFile] = useState(null);
	const [imageId, setImageId] = useState(null);
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");

	const handleUpload = (acceptedFiles) => {
		setFile(URL.createObjectURL(acceptedFiles[0]));

		const formData = new FormData();
		formData.append("file", acceptedFiles[0]);

		fetch(config.uploadImageUrl, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Upload success:", data);
				setImageId(data.id);
			})
			.catch((error) => {
				console.error("Error uploading file:", error);
			});
	};

	const handleSave = () => {
		if (!imageId) {
			console.error(
				"Image ID is missing. Cannot update profile picture."
			);
			return;
		}

		const accessToken = localStorage.getItem("accessToken");

		const payload = {
			name: username || "defaultName", // Устанавливаем значение по умолчанию, если поле пустое
			imageId: imageId,
			description: description || "defaultDescription", // Устанавливаем значение по умолчанию, если поле пустое
		};

		fetch(`${config.apiBaseUrl}/user/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Update success:", data);
				if (data.image && data.image.fullFilename) {
					localStorage.setItem(
						"profilePicture",
						data.image.fullFilename
					);
					window.location.reload();
				} else {
					console.error("Profile update failed:", data);
				}
			})
			.catch((error) => {
				console.error("Error updating profile picture:", error);
			});
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
