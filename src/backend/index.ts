import {
	newFinanceProcess,
	listFinanceProcess,
	editFinanceProcess,
	deleteFinanceProcess,
} from "./processFinances";
import { IUser } from "../components/login/IUser";
import { ipcMain } from "electron";
import processLogin from "./processLogin";
import { IStyle } from "../contexts/ThemeContext";
import styleProcess from "./processStyle";
import {
	deleteScheduleProcess,
	editScheduleProcess,
	listScheduleProcess,
	newScheduleProcess,
} from "./processSchedule";

export interface IData {
	login: IUser;
	style: IStyle;
}

export interface IResultStatus<T> {
	data?: T;
	status: "success" | "ok" | "error";
	message?: string;
}

export interface IFinance {
	id?: string;
	descricao?: string;
	valor?: string;
	tipo?: "entrada" | "saida" | string;
	data?: string;
}

export async function registerListeners() {
	ipcMain.on("login", (event: Electron.IpcMainEvent, data) => {
		processLogin(data.user, data.newLogin)
			.then((result) => {
				event.reply("login", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("login", response);
			});
	});

	ipcMain.on("style", (event: Electron.IpcMainEvent, data) => {
		styleProcess(data.style, data.newStyle)
			.then((result) => {
				event.reply("style", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("style", response);
			});
	});

	ipcMain.on("newfinance", (event: Electron.IpcMainEvent, data) => {
		newFinanceProcess(data.finance, data.ano, data.mes)
			.then((result) => {
				event.reply("newfinance", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("newfinance", response);
			});
	});

	ipcMain.on("finance", (event: Electron.IpcMainEvent, data) => {
		listFinanceProcess(data.ano, data.mes)
			.then((result) => {
				event.reply("finance", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("finance", response);
			});
	});

	ipcMain.on("editfinance", (event: Electron.IpcMainEvent, data) => {
		editFinanceProcess(data.finance, data.ano, data.mes)
			.then((result) => {
				event.reply("editfinance", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("editfinance", response);
			});
	});

	ipcMain.on("deletefinance", (event: Electron.IpcMainEvent, data) => {
		deleteFinanceProcess(data.finance, data.ano, data.mes)
			.then((result) => {
				event.reply("deletefinance", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("deletefinance", response);
			});
	});

	ipcMain.on("newschedule", (event: Electron.IpcMainEvent, data) => {
		newScheduleProcess(data.schedule, data.ano, data.mes, data.dia)
			.then((result) => {
				event.reply("newschedule", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("newschedule", response);
			});
	});

	ipcMain.on("schedule", (event: Electron.IpcMainEvent, data) => {
		listScheduleProcess(data.ano, data.mes, data.dia)
			.then((result) => {
				event.reply("schedule", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("schedule", response);
			});
	});

	ipcMain.on("editschedule", (event: Electron.IpcMainEvent, data) => {
		editScheduleProcess(data.schedule, data.ano, data.mes, data.dia)
			.then((result) => {
				event.reply("editschedule", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("editschedule", response);
			});
	});

	ipcMain.on("deleteschedule", (event: Electron.IpcMainEvent, data) => {
		deleteScheduleProcess(data.schedule, data.ano, data.mes, data.dia)
			.then((result) => {
				event.reply("deleteschedule", result);
			})
			.catch((err: string) => {
				const response: IResultStatus<string> = {
					data: err,
					status: "error",
				};
				event.reply("deleteschedule", response);
			});
	});
}
