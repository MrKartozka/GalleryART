import React from "react";
import AddedGroups from "../AddedGroups/AddedGroups";
import SavedGroups from "../SavedGroups/SavedGroups";

// Компонент UserGroups рендерит разные группы постов в зависимости от текущей группы
const UserGroups = ({ group, posts, onPostClick }) => {
	if (group === "added") {
		// Если текущая группа - "added", рендерит компонент AddedGroups
		return <AddedGroups posts={posts} onPostClick={onPostClick} />;
	} else if (group === "saved") {
		// Если текущая группа - "saved", рендерит компонент SavedGroups
		return <SavedGroups />;
	} else {
		return null;
	}
};

export default UserGroups;
