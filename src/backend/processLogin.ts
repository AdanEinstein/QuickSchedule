import { IResultStatus } from './index'
import { IData } from './index'
import { IUser } from '../components/login/IUser'
import fs from 'fs'
import path from 'path'
import os from 'os'

export const folderExists = (pathBase?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pathRootInfos = pathBase
      ? path.join(os.homedir(), 'quick_schedule', pathBase)
      : path.join(os.homedir(), 'quick_schedule')
    if (!fs.existsSync(pathRootInfos)) {
      fs.mkdir(pathRootInfos, error => {
        if (error) {
          reject('Erro para criar a pasta!')
        }
      })
    }
    resolve(pathRootInfos)
  })
}

export const fileExists = (pathRoot: string, file: string, array?: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileRoot = path.join(pathRoot, file)
    if (!fs.existsSync(fileRoot)) {
      fs.writeFile(fileRoot, JSON.stringify(array ? []:{}), error => {
        if (error) {
          reject('Falha ao escrever no arquivo!')
        }
        resolve(fileRoot)
      })
    } else {
      resolve(fileRoot)
    }
  })
}

const loginProcess = (
  filePath: string,
  login: IUser,
  newLogin?: boolean
): Promise<IResultStatus<IUser>> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject('Arquivo não existente!')
    }
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject('Impossível de ler o arquivo!')
      }
      const dataJson: IData = JSON.parse(data)
      if (dataJson.login && !newLogin) {
        resolve({ data: dataJson.login, status: 'ok' })
      } else {
        const newDataJson = JSON.stringify({ login })
        fs.writeFile(filePath, newDataJson, error => {
          if (error) {
            reject('Error para fazer new data Json!')
          }
        })
        resolve({ message: 'Registramos o seu novo login!', status: 'ok' })
      }
    })
  })
}

const processLogin = (login: IUser, newLogin: boolean) => {
  return new Promise<IResultStatus<IUser>>((resolve, reject) => {
    folderExists()
      .then(pathRoot => fileExists(pathRoot, 'data.json'))
      .then(filePath => loginProcess(filePath, login, newLogin))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

export default processLogin
