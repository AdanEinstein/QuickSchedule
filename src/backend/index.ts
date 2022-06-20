import { newFinanceProcess, listFinanceProcess, editFinanceProcess, deleteFinanceProcess } from './processFinances';
import { IUser } from '../components/login/IUser'
import { ipcMain } from 'electron'
import processLogin from './processLogin'
import { IStyle } from '../contexts/ThemeContext'
import styleProcess from './processStyle'

export interface IData {
  login: IUser
  style: IStyle
}

export interface IResultStatus<T> {
  data?: T
  status: 'success' | 'ok' | 'error'
  message?: string
}

export interface IFinance {
  id?: string
  descricao?: string
  valor?: string
  tipo?: 'entrada' | 'saida' | string
  data?: string
}

export async function registerListeners() {
  ipcMain.on('login', (event: Electron.IpcMainEvent, data) => {
    processLogin(data.user, data.newLogin)
      .then(result => {
        event.reply('login', result)
      })
      .catch((err: string) => {
        const response: IResultStatus<string> = { data: err, status: 'error' }
        event.reply('login', response)
      })
  })

  ipcMain.on('style', (event: Electron.IpcMainEvent, data) => {
    styleProcess(data.style, data.newStyle)
      .then(result => {
        event.reply('style', result)
      })
      .catch((err: string) => {
        const response: IResultStatus<string> = { data: err, status: 'error' }
        event.reply('style', response)
      })
  })
  
  ipcMain.on('newfinance', (event: Electron.IpcMainEvent, data) => {
    newFinanceProcess(data.finance, data.ano, data.mes)
      .then(result => {
        event.reply('newfinance', result)
      })
      .catch((err: string) => {
        const response: IResultStatus<string> = { data: err, status: 'error' }
        event.reply('newfinance', response)
      })
  })
  
  ipcMain.on('finance', (event: Electron.IpcMainEvent, data) => {
    listFinanceProcess(data.ano, data.mes)
      .then(result => {
        event.reply('finance', result)
      })
      .catch((err: string) => {
        const response: IResultStatus<string> = { data: err, status: 'error' }
        event.reply('finance', response)
      })
  })
  
  ipcMain.on('editfinance', (event: Electron.IpcMainEvent, data) => {
    editFinanceProcess(data.finance, data.ano, data.mes)
      .then(result => {
        event.reply('editfinance', result)
      })
      .catch((err: string) => {
        const response: IResultStatus<string> = { data: err, status: 'error' }
        event.reply('editfinance', response)
      })
  })
  
  ipcMain.on('deletefinance', (event: Electron.IpcMainEvent, data) => {
    deleteFinanceProcess(data.finance, data.ano, data.mes)
      .then(result => {
        event.reply('deletefinance', result)
      })
      .catch((err: string) => {
        const response: IResultStatus<string> = { data: err, status: 'error' }
        event.reply('deletefinance', response)
      })
  })
}
