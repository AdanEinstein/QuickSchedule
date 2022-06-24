import React, { useCallback, useEffect, useRef, useState } from "react";
import { Overlay, Popover, PopoverBody, PopoverHeader } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSchedule } from "../../../contexts/ScheduleContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { ISchedule, Status } from "./ISchedule";

interface IStatusTableProps {
	status: Status;
}

const StatusTable: React.FC<IStatusTableProps> = ({ status }) => {
	const tdRef = useRef<HTMLTableDataCellElement>(null);
	const [show, setShow] = useState<boolean>(false);
	return (
		<>
			<td
				className={`${
					(status === "agendado" && "table-secondary") ||
					(status === "concluido" && "table-success") ||
					(status === "cancelado" && "table-danger")
				}`}
				ref={tdRef}
				onClick={() => {
					setShow(true)
				}}
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
			>
				{(status === "agendado" && (
					<span>
						Agendado <i className="bi bi-hourglass-split"></i>
					</span>
				)) ||
					(status === "concluido" && (
						<span>
							Concluído <i className="bi bi-check2-circle"></i>
						</span>
					)) ||
					(status === "cancelado" && (
						<span>
							Cancelado <i className="bi bi-x-circle"></i>
						</span>
					))}
			</td>
			<Overlay target={tdRef.current} show={show} placement={"left-start"}>
				{(props) => {
					return (
						<Popover {...props}>
							<PopoverHeader as="h3">Status</PopoverHeader>
							<PopoverBody>
								<div className="d-flex flex-column">
									<Button
										className="flex-grow-1 m-3"
										variant={"secondary"}
										size="lg"
									>
										Agendado{" "}
										<i className="bi bi-hourglass-split"></i>
									</Button>
									<Button
										className="flex-grow-1 m-3"
										variant={"danger"}
										size="lg"
									>
										Cancelado{" "}
										<i className="bi bi-x-circle"></i>
									</Button>
									<Button
										className="flex-grow-1 m-3"
										variant={"success"}
										size="lg"
									>
										Concluído{" "}
										<i className="bi bi-check2-circle"></i>
									</Button>
								</div>
							</PopoverBody>
						</Popover>
					);
				}}
			</Overlay>
		</>
	);
};

// interface IChooseStatus {
// 	schedule: ISchedule;
// 	setShowModal(arg: boolean): void;
// }

// const FormAcoes: React.FC<IChooseStatus & ModalProps> = ({
// 	setShowModal,
// 	schedule,
//     ...props
// }) => {
// 	const { theme, font } = useTheme();
// 	const { dia, mes, ano } = useSchedule();

// 	const handleStatus = useCallback(() => {}, []);

//     useEffect(() => {
//         console.log(schedule);

//     },[])

// 	return (
// 		<Modal {...props} size="lg" centered>
// 			<ModalHeader
// 				closeButton
// 				style={{
// 					background: `var(--bg-color-${theme}`,
// 					color: `var(--color-${font})`,
// 				}}
// 			>
// 				<ModalTitle>Escolha o novo status:</ModalTitle>
// 			</ModalHeader>
// 			<ModalBody style={{ background: "#222" }}>
// 				<div className="d-flex flex-column">
// 					<Button
// 						className="flex-grow-1 m-3"
// 						variant={"secondary"}
// 						size="lg"
// 					>
// 						Agendado <i className="bi bi-hourglass-split"></i>
// 					</Button>
// 					<Button
// 						className="flex-grow-1 m-3"
// 						variant={"danger"}
// 						size="lg"
// 					>
// 						Cancelado <i className="bi bi-x-circle"></i>
// 					</Button>
// 					<Button
// 						className="flex-grow-1 m-3"
// 						variant={"success"}
// 						size="lg"
// 					>
// 						Concluído <i className="bi bi-check2-circle"></i>
// 					</Button>
// 				</div>
// 			</ModalBody>
//             <ModalFooter></ModalFooter>
// 		</Modal>
// 	);
// };

export default StatusTable;
