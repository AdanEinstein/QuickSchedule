import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSchedule } from "../../../contexts/ScheduleContext";
import { ILayoutTelaSchedule } from "../../../pages/schedule";
import Layout from "../../layout/Layout";
import ListSchedules from "./ListSchedules";

type Telas = "novo" | "lista";

const LayoutSchedule: React.FC<ILayoutTelaSchedule> = ({ setShowTela }) => {
	const [telas, setTelas] = useState<Telas>("lista");
	const { dia, mes, ano } = useSchedule();
	return (
		<Layout menu>
			<Container>
				<Row>
					<div className="col-lg-2 d-none"></div>
					<div className="w-100 col-lg-8 col-12 d-flex flex-column justify-content-center">
						<div className="d-flex justify-content-around my-4">
							<h1 className="text-white text-center">
								Data: {`${dia}/${mes}/${ano}`}
							</h1>
							<Button variant="success"
								onClick={() => setShowTela('calendario')}
							>
								Calendário <i className="bi bi-calendar3"></i>
							</Button>
						</div>
						<div className="flex-grow-1">
							{telas === "lista" && <ListSchedules />}
						</div>
					</div>
					<div className="col-lg-2 d-none"></div>
				</Row>
			</Container>
		</Layout>
	);
};

export default LayoutSchedule;
