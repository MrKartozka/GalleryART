import { React } from "react";
import "./Settings.css";
import { Link } from "react-router-dom";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";

function Settings({ userEmail, onLogout }) {
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
									src="big-profile.png"
									alt=""
									width="50px"
								/>
								<button className="settings__profile-edit-box-change-btn">
									Изменить
								</button>
							</div>
						</div>
						<div className="settings__profile-box">
							<form action="" class="settings__profile-form">
								<label htmlFor="settings-change">
									Имя пользователя
									<input
										type="text"
										id="settings-change"
										placeholder='"Никнейм"'
										className="settings-description-input input-change"
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
									type="submit"
									className="settings__profile-submit-btn"
								>
									Сохранить
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
