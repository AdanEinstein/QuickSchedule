import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import Day from "./Day";
import "./Calendar.css";
import Week from "./Week";
import { useTheme } from "../../contexts/ThemeContext";
import { amountCalendar, IDataCalendar } from "../utils/utils";
import shortid from "shortid";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../../contexts/ScheduleContext";
import {ILayoutTelaSchedule} from '../../pages/schedule'

interface IProps {
	data: IDataCalendar;
}

const Calendar: React.FC<IProps & ILayoutTelaSchedule> = (props) => {
	const { font, theme } = useTheme();
	const [datas, setDatas] = useState<IDataCalendar[]>();
	const {setDia, setMes, setAno, dia, mes, ano} = useSchedule()

	useEffect(() => {
		const calendar = amountCalendar(parseInt(props.data.ano), parseInt(props.data.mes));
		setDatas([...calendar]);
	}, [props.data]);

	const handlerSchedule = useCallback((day: IDataCalendar) => {
		setDia(day.dia)
		setMes(day.mes)
		setAno(day.ano)
		props.setShowTela('todo')
	}, [dia, mes, ano])

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
								thisDay={current.dia === props.data.dia}
								notThisMonth={
									current.mes !==
									`${
										parseInt(props.data.mes) < 10
											? `0${props.data.mes}`
											: `${props.data.mes}`
									}`
								}
								onClick={() => handlerSchedule(current)}
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
