import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Layout from "../components/layout/Layout";
import Calendar from "../components/schedule/Calendar";
import MonthNavButton from "../components/schedule/MonthNavButton";
import { IDataCalendar, nameMonth } from "../components/utils/utils";

const dataAtual = new Date();

const Schedule: React.FC = () => {
	const [data, setData] = useState<IDataCalendar>({
		dia: `${dataAtual.getDate()}`,
		mes: `${dataAtual.getMonth() + 1}`,
		ano: `${dataAtual.getFullYear()}`,
	});
	return (
		<Layout menu>
			<Container className="d-flex flex-column">
				<Row>
					<div className="d-flex justify-content-center my-3">
						<h1 className="text-white">Agenda: {`${nameMonth(parseInt(data.mes))} de ${data.ano}`}</h1>
					</div>
				</Row>
				<Row>
					<MonthNavButton data={data} setData={setData} />
				</Row>
				<Row className="flex-grow-1">
					<Calendar data={data} />
				</Row>
			</Container>
		</Layout>
	);
};

export default Schedule;
