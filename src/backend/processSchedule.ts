import { IResultStatus } from ".";
import fs from "fs";
import { fileExists, folderExists } from "./processLogin";
import { ISchedule } from "../components/schedule/todo/ISchedule";

const newSchedule = (
	filePath: string,
	schedule: ISchedule,
	existsSchedule?: boolean,
	deleteSchedule?: boolean
): Promise<IResultStatus<ISchedule>> => {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(filePath)) {
			reject("Arquivo não existente!");
		}
		fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
			if (err) {
				reject("Impossível de ler o arquivo!");
			}
			let dataJson: ISchedule[] = JSON.parse(data);
			if (dataJson) {
				if (existsSchedule) {
					if (deleteSchedule) {
						dataJson = dataJson.filter(
							(current) => schedule.id != current.id
						);
					} else {
						dataJson = dataJson.map((current) => {
							if (current.id === schedule.id) {
								return schedule;
							} else {
								return current;
							}
						});
					}
				} else {
					dataJson.push(schedule);
				}
				const dataJsonStringify = JSON.stringify(dataJson);
				fs.writeFile(filePath, dataJsonStringify, (error) => {
					if (error) {
						reject("Error para fazer new data Json!");
					}
				});
				resolve({
					data: schedule,
					message: "Agendamento efetuado com sucesso!",
					status: "ok",
				});
			} else {
				const newDataJson = JSON.stringify([schedule]);
				fs.writeFile(filePath, newDataJson, (error) => {
					if (error) {
						reject("Error para fazer new data Json!");
					}
				});
				resolve({
					data: schedule,
					message: "Agendamento efetuado com sucesso!",
					status: "ok",
				});
			}
		});
	});
};

const listSchedule = (
	filePath: string
): Promise<IResultStatus<ISchedule[]>> => {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(filePath)) {
			reject("Arquivo não existente!");
		}
		fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
			if (err) {
				reject("Impossível de ler o arquivo!");
			}
			const dataJson: ISchedule[] = JSON.parse(data);
			if (dataJson) {
				resolve({
					data: dataJson,
					message: "Listagem concluída!",
					status: "ok",
				});
			} else {
				resolve({
					data: [],
					message: "Listagem vazia!",
					status: "ok",
				});
			}
		});
	});
};

export const newScheduleProcess = (
	schedule: ISchedule,
	ano: string,
	mes: string,
	dia: string
) => {
	return new Promise<IResultStatus<ISchedule>>((resolve, reject) => {
		folderExists(`schedule_ano_${ano}`, `mes_${mes}`)
			.then((pathRoot) => fileExists(pathRoot, `dia_${dia}.json`, true))
			.then((filePath) => newSchedule(filePath, schedule))
			.then((result) => resolve(result))
			.catch((err) => reject(err));
	});
};

export const listScheduleProcess = (ano: string, mes: string, dia: string) => {
	return new Promise<IResultStatus<ISchedule[]>>((resolve, reject) => {
		folderExists(`schedule_ano_${ano}`, `mes_${mes}`)
			.then((pathRoot) => fileExists(pathRoot, `dia_${dia}.json`, true))
			.then((filePath) => listSchedule(filePath))
			.then((result) => resolve(result))
			.catch((err) => reject(err));
	});
};

export const editScheduleProcess = (
	schedule: ISchedule,
	ano: string,
	mes: string,
    dia: string
) => {
	return new Promise<IResultStatus<ISchedule>>((resolve, reject) => {
		folderExists(`schedule_ano_${ano}`, `mes_${mes}`)
			.then((pathRoot) => fileExists(pathRoot, `dia_${dia}.json`, true))
			.then((filePath) => newSchedule(filePath, schedule, true))
			.then((result) => resolve(result))
			.catch((err) => reject(err));
	});
};

export const deleteScheduleProcess = (
	schedule: ISchedule,
	ano: string,
	mes: string,
    dia: string
) => {
	return new Promise<IResultStatus<ISchedule>>((resolve, reject) => {
		folderExists(`schedule_ano_${ano}`, `mes_${mes}`)
			.then((pathRoot) => fileExists(pathRoot, `dia_${dia}.json`, true))
			.then((filePath) => newSchedule(filePath, schedule, true, true))
			.then((result) => resolve(result))
			.catch((err) => reject(err));
	});
};
