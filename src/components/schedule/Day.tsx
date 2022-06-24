import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
	Overlay,
	OverlayTrigger,
	Popover,
	PopoverBody,
	PopoverHeader,
} from "react-bootstrap";
import { IResultStatus } from "../../backend";
import { IDataCalendar } from "../utils/utils";
import "./Day.css";
import { ISchedule } from "./todo/ISchedule";

interface DayProps {
	notThisMonth?: boolean;
	thisDay?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

const Day: React.FC<DayProps> = ({
	children,
	thisDay,
	notThisMonth,
	onClick,
}) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState<boolean>(false);
	const [countTasks, setCountTasks] = useState<number>(0);
	return (
		<>
			<div
				className={`Day d-flex justify-content-center align-items-center flex-grow-1 ${
					thisDay && "selected"
				} ${notThisMonth && "month"}`}
				ref={divRef}
				onClick={!notThisMonth ? onClick : undefined}
				onMouseEnter={() => !notThisMonth && setShow(true)}
				onMouseLeave={() => !notThisMonth && setShow(false)}
			>
				{countTasks !== 0 && !notThisMonth && (
					<div className="CountTasks">{countTasks}</div>
				)}
				{children}
			</div>
			<Overlay target={divRef.current} show={show} placement="top">
				{(props) =>
					countTasks ? (
						<Popover {...props}>
							<PopoverHeader as="h3">Resumo</PopoverHeader>
							<PopoverBody>
								Você possui <strong>{countTasks}</strong>{" "}
								agendamentos neste dia!
								<br />
								Clique e agende mais!
							</PopoverBody>
						</Popover>
					) : (
						<Popover {...props}>
							<PopoverHeader as="h3">Dica</PopoverHeader>
							<PopoverBody>
								Clique aqui para efetuar um novo agendamento!
							</PopoverBody>
						</Popover>
					)
				}
			</Overlay>
		</>
	);
};

export default Day;
