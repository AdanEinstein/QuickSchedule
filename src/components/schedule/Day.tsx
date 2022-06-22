import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "./Day.css";

interface DayProps {
	thisDay?: boolean;
	counttasks?: number;
}

const Day: React.FC<DayProps> = ({ counttasks, children, thisDay }) => {
	return (
		<div
			className={`Day d-flex justify-content-center align-items-center flex-grow-1 ${
				thisDay ? "selected" : ""
			}`}
		>
			{children}
		</div>
	);
};

export default Day;
