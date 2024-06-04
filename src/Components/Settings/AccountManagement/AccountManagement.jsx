import React from "react";
import "./AccountManagement.css";
import { Link } from "react-router-dom";
import NavigationBarWithoutFind from "../../NavigationBarWithoutFind/NavigationBarWithoutFind";

function AccountManagement() {
	return (
		<>
			<NavigationBarWithoutFind />
			<div className="manage-settings">
				<div className="manage-settings__container">
					<div className="manage-settings__list">
						<Link to="/settings">
							<button className="manage-settings__list-button edit-btn">
								Изменение профиля
							</button>
						</Link>
						<button className="manage-settings__list-button manage-btn">
							Управление аккаунтом
						</button>
						<button className="manage-settings__list-button visibility-btn">
							Видимость профиля
						</button>
						<button className="manage-settings__list-button safe-btn">
							Безопасность
						</button>
					</div>
					<div className="manage-settings__profile">
						<div className="manage-settings__texts">
							<h2 className="manage-settings__texts-title">
								Управление аккаунтом
							</h2>
							<p className="manage-settings__texts-description">
								Вы можете изменить персональные данные или тип
								аккаунта.
							</p>
						</div>
						<div className="manage-settings__profile-box">
							<h2 className="manage-settings__profile-title">
								Ваш аккаунт
							</h2>
							<form
								action=""
								class="manage-settings__profile-form"
							>
								<label htmlFor="manage-settings-email">
									Электронная почта (скрытая информация)
									<input
										type="text"
										id="manage-settings-email"
										placeholder='"Почта"'
										className="manage-settings-email-input email-change"
									/>
								</label>
								<label htmlFor="manage-settings-password">
									Пароль
									<input
										type="text"
										id="manage-settings-password"
										className="manage-settings-password-input password-field"
									/>
								</label>
								<button
									className="manage-settings__profile-change-password"
									type="button"
								>
									Сменить пароль
								</button>
							</form>
						</div>
						<div className="manage-settings__profile-deactivate-and-delete">
							<div className="manage-settings__profile-deactivate">
								<p className="manage-settings__profile-deactivate-title">
									Отключить аккаунт
								</p>
								<div className="manage-settings__profile-deactivate-off">
									<p className="manage-settings__profile-deactivate-off-text">
										Временно скройте профиль, картинки и
										альбомы
									</p>
									<button className="manage-settings__profile-deactivate-off-btn">
										Отключить аккаунт
									</button>
								</div>
							</div>
							<div className="manage-settings__profile-delete">
								<p>Удаление данных и аккаунта</p>
								<div className="manage-settings__profile-delete-off">
									<p className="manage-settings__profile-off-delete-text">
										Безвозвратное удаление данных и всего,
										что связано с аккаунтом
									</p>
									<button className="manage-settings__profile-delete-off-btn">
										Удалить аккаунт
									</button>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="manage-settings__profile-submit-btn"
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default AccountManagement;
