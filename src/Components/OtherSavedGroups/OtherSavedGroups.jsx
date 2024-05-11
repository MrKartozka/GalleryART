import React from "react";
import "./OtherSavedGroups.css";

const OtherSavedGroups = () => {
	return (
		<div className="saved-groups">
			<div className="saved-groups__albums">
				<div className="saved-groups__albums-item">
					<img src="../../../background.jpg" alt="" />
					<h4>Все картинки</h4>
					<p>3 картинки</p>
				</div>
				<div className="saved-groups__albums-item">
					<img src="../../../route.jpg" alt="" />
					<h4>Альбом1</h4>
					<p>3 альбома</p>
				</div>
			</div>
		</div>
	);
};

export default OtherSavedGroups;
