import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useSchedule } from "../../../contexts/ScheduleContext";
import { ISchedule } from "./ISchedule";
import { IResultStatus } from "../../../backend";

const ListSchedules: React.FC = () => {
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

	return (
		<Container>
			<Table className="table-light">
				<thead>
					<tr>
						<th>Horário</th>
						<th>Cliente</th>
						<th>Status</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{/* {schedules?.map((schedule) => {
						return (
							<tr key={schedule.id}>
								<td>{schedule.horario}</td>
								<td>{schedule.cliente}</td>
								<td>{schedule.status}</td>
								<td className="d-flex justify-content-around">
									<Button
										size="sm"
										variant="warning"
										// onClick={() => handleListEdit(schedule)}
									>
										<i className="bi bi-pencil-square flex-grow-1 mx-1"></i>
									</Button>
									<Button
										size="sm"
										variant="danger"
										// onClick={() =>	handleListDelete(schedule)}
									>
										<i className="bi bi-trash-fill flex-grow-1 mx-1"></i>
									</Button>
								</td>
							</tr>
						);
					})} */}
				</tbody>
			</Table>
		</Container>
	);
};

export default ListSchedules;
