import React from "react";
import SavedGroups from "../SavedGroups/SavedGroups";
import AddedGroups from "../AddedGroups/AddedGroups";

function UserGroups(group) {
	const currentGroup = group.data;

	if (currentGroup === "added") {
		return <AddedGroups />;
	} else if (currentGroup === "saved") {
		return <SavedGroups />;
	}
}

export default UserGroups;
