import React from "react";
import AddedGroups from "../AddedGroups/AddedGroups";
import SavedGroups from "../SavedGroups/SavedGroups";

const UserGroups = ({ group, posts, onPostClick }) => {
	if (group === "added") {
		return <AddedGroups posts={posts} onPostClick={onPostClick} />;
	} else if (group === "saved") {
		return <SavedGroups />;
	} else {
		return null;
	}
};

export default UserGroups;
