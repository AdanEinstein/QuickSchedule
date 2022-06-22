import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import Day from "./Day";
import "./Calendar.css";
import Week from "./Week";
import { useTheme } from "../../contexts/ThemeContext";
import { amountCalendar, IDataCalendar } from "../utils/utils";
import shortid from "shortid";

interface IProps {
	data: IDataCalendar;
}

const Calendar: React.FC<IProps> = ({ data }) => {
	const { font, theme } = useTheme();
	const [datas, setDatas] = useState<IDataCalendar[]>();

	useEffect(() => {
		const calendar = amountCalendar(parseInt(data.ano), parseInt(data.mes));
		setDatas([...calendar]);
	}, [data]);

	return (
		<Container className="d-flex justify-content-center">
			<div className="col-md-1 col-lg-1 d-none"></div>
			<div className="col-md-10 col-lg-10 col-12 pb-3">
				<div
					className="Calendar border-dark"
					style={{
						background: `var(--bg-color-${theme})`,
						color: `var(--color-${font})`,
					}}
				>
					<Week />
					{datas?.map((current) => {
						return (
							<Day
								key={shortid()}
								thisDay={current.dia === data.dia}
								notThisMonth={
									current.mes !==
									`${
										parseInt(data.mes) < 10
											? `0${data.mes}`
											: `${data.mes}`
									}`
								}
							>
								{current.dia}
							</Day>
						);
					})}
				</div>
			</div>
			<div className="col-md-1 col-lg-1 d-none"></div>
		</Container>
	);
};

export default Calendar;
