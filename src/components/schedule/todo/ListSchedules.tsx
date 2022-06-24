import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useSchedule } from "../../../contexts/ScheduleContext";
import { ISchedule, Status } from "./ISchedule";
import { IResultStatus } from "../../../backend";
import "./ListSchedule.css";
import { IAcoes } from "./LayoutSchedule";
import shortid from "shortid";
import StatusTable from "./StatusTable";

const ListSchedules: React.FC<IAcoes> = ({ setTelas, target, setTarget }) => {
	const { dia, mes, ano, schedules, setSchedules } = useSchedule();

	useEffect(() => {
		window.Main.sendMessage("schedule", { ano, mes, dia });
		window.Main.on(
			"schedule",
			(_: any, resp: IResultStatus<ISchedule[]>) => {
				resp.data && setSchedules(resp.data);
			}
		);
	}, [dia, mes, ano]);

	const handleListDelete = useCallback(
		(schedule: ISchedule) => {
			if (setTarget && setTelas) {
				setTarget({ schedule, estado: "deletar" });
				setTelas("form");
			}
		},
		[setTarget, setTelas]
	);

	const handleListEdit = useCallback(
		(schedule: ISchedule) => {
			if (setTarget && setTelas) {
				setTarget({ schedule, estado: "editar" });
				setTelas("form");
			}
		},
		[setTarget, setTelas]
	);

	return (
		<Container className="Lista">
			<Table className="table-light">
				<thead className="table-dark">
					<tr>
						<th>Horário</th>
						<th>Cliente</th>
						<th>Status</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{schedules?.map((sch) => {
						return (
							<tr key={sch.id}>
								<td>{sch.horario}</td>
								<td>{sch.cliente}</td>
								<StatusTable status={sch.status} />
								<td className="d-flex justify-content-around">
									<Button
										size="sm"
										variant="warning"
										onClick={() => handleListEdit(sch)}
									>
										<i className="bi bi-pencil-square flex-grow-1 mx-1"></i>
									</Button>
									<Button
										size="sm"
										variant="danger"
										onClick={() => handleListDelete(sch)}
									>
										<i className="bi bi-trash-fill flex-grow-1 mx-1"></i>
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Button
				className="position-absolute btn-lg"
				style={{ bottom: 30, right: 30 }}
				onClick={() => {
					setTarget &&
						setTarget({
							schedule: {
								id: shortid(),
								data: { ano, mes, dia },
								cliente: "",
								horario: "",
								produto: [],
								status: "agendado",
							},
							estado: "novo",
						});
					setTelas && setTelas("form");
				}}
			>
				Novo agendamento <i className="bi bi-plus-square-fill"></i>
			</Button>
		</Container>
	);
};

export default ListSchedules;
