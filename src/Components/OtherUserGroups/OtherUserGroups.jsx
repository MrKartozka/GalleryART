import React from "react";
import OtherSavedGroups from "../OtherSavedGroups/OtherSavedGroups";
import OtherAddedGroups from "../OtherAddedGroups/OtherAddedGroups";

function OtherUserGroups(group) {
	const currentGroup = group.data;

	if (currentGroup === "added") {
		return <OtherAddedGroups />;
	} else if (currentGroup === "saved") {
		return <OtherSavedGroups />;
	}
}

export default OtherUserGroups;
