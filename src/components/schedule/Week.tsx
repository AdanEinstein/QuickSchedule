import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "./Week.css";

const WeekDay: React.FC = ({ children }) => {
	return (
		<div className="WeekDay d-flex justify-content-center align-items-center flex-grow-1">
			{children}
		</div>
	);
};

const Week: React.FC = () => {
	return (
		<div className="Week d-flex justify-content-around">
			<WeekDay>Dom</WeekDay>
			<WeekDay>Seg</WeekDay>
			<WeekDay>Ter</WeekDay>
			<WeekDay>Qua</WeekDay>
			<WeekDay>Qui</WeekDay>
			<WeekDay>Sex</WeekDay>
			<WeekDay>Sáb</WeekDay>
		</div>
	);
};

export default Week;
