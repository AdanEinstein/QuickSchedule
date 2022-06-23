import React, { MouseEventHandler, useRef, useState } from "react";
import {
	Overlay,
	OverlayTrigger,
	Popover,
	PopoverBody,
	PopoverHeader,
} from "react-bootstrap";
import "./Day.css";

interface DayProps {
	notThisMonth?: boolean;
	thisDay?: boolean;
	counttasks?: number;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

const Day: React.FC<DayProps> = ({
	counttasks,
	children,
	thisDay,
	notThisMonth,
	onClick,
}) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState<boolean>(false);

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
				{counttasks && <div className="CountTasks">{counttasks}</div>}
				{children}
			</div>
			<Overlay target={divRef.current} show={show} placement="top">
				{(props) =>
					counttasks ? (
						<Popover {...props}>
							<PopoverHeader as="h3">Resumo</PopoverHeader>
							<PopoverBody>
								Você possui <strong>{counttasks}</strong>{" "}
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
