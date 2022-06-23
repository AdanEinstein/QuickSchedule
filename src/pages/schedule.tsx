import React, { useState } from "react";
import LayoutCalendar from "../components/schedule/LayoutCalendar";
import LayoutSchedule from "../components/schedule/todo/LayoutSchedule";
import ScheduleProvider from "../contexts/ScheduleContext";

type Telas = 'calendario' | 'todo'

export interface ILayoutTelaSchedule{
	setShowTela(arg: Telas): void
}

const Schedule: React.FC = () => {
	const [showTela, setShowTela] = useState<Telas>('todo')
	return (
		<ScheduleProvider>
			{showTela === 'calendario' && <LayoutCalendar setShowTela={setShowTela} />}
			{showTela === 'todo' && <LayoutSchedule setShowTela={setShowTela}/>}
		</ScheduleProvider>
	);
};

export default Schedule;
