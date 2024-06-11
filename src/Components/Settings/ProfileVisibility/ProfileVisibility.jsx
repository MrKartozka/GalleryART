import React from "react";
import "./ProfileVisibility.css";
import { Link } from "react-router-dom";
import NavigationBarWithoutFind from "../../NavigationBarWithoutFind/NavigationBarWithoutFind";

function ProfileVisibility() {
	return (
		<>
			<NavigationBarWithoutFind />
			<div className="visibility-settings">
				<div className="visibility-settings__container">
					<div className="visibility-settings__list">
						<Link to="/settings">
							<button className="visibility-settings__list-button edit-btn">
								Изменение профиля
							</button>
						</Link>
						<Link to="/account-management">
							<button className="visibility-settings__list-button manage-btn">
								Управление аккаунтом
							</button>
						</Link>
						<Link to="/profile-visibility">
							<button className="visibility-settings__list-button visibility-btn">
								Видимость профиля
							</button>
						</Link>
						<button className="visibility-settings__list-button safe-btn">
							Безопасность
						</button>
					</div>
					<div className="visibility-settings__profile">
						<div className="visibility-settings__texts">
							<h2 className="visibility-settings__texts-title">
								Видимость профиля
							</h2>
							<p className="visibility-settings__texts-description">
								Управляйте тем, как пользователи могут
								просматривать ваш профиль на GalleryArt.
							</p>
						</div>
						<div className="visibility-settings__profile-privacy">
							<div className="visibility-settings__profile-privacy-private">
								<p className="visibility-settings__profile-privacy-private-title">
									Частный профиль
								</p>
								<div className="visibility-settings__profile-privacy-private-box">
									<p className="visibility-settings__profile-privacy-private-box-text">
										Если у вас частный профиль, только
										одобренные вами люди могут просматривать
										его, а также ваши пины, доски,
										подписчиков и подписки.
									</p>
									<div class="visibility-settings__profile-privacy-private-box-switch">
										<label class="switch">
											<input type="checkbox" />
											<span class="slider round"></span>
										</label>
									</div>
								</div>
							</div>
							<div className="visibility-settings__profile-privacy-confidential">
								<p className="visibility-settings__profile-privacy-confidential-title">
									Конфиденциальность в поисковых системах
								</p>
								<div className="visibility-settings__profile-privacy-confidential-box">
									<p className="visibility-settings__profile-privacy-confidential-box-text">
										Скройте профиль и доски от поисковых
										систем (например, Google).
									</p>
									<div class="visibility-settings__profile-privacy-confidential-box-switch">
										<label class="switch">
											<input type="checkbox" />
											<span class="slider round"></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="visibility-settings__profile-privacy-btn"
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfileVisibility;
