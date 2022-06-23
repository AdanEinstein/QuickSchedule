import { IDataCalendar } from './../../utils/utils';

type Status = 'agendado' | 'concluido' | 'encerrado' | 'cancelado'

export interface ISchedule {
    id: string,
    data: IDataCalendar,
    horario: string,
    cliente: string,
    status: Status
}