import { IData, IResultStatus } from '.'
import { IStyle } from '../contexts/ThemeContext'
import fs from 'fs'
import { fileExists, folderExists } from './processLogin'

const styleExists = (
  filePath: string,
  style: IStyle,
  newStyle: boolean
): Promise<IResultStatus<IStyle>> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject('Arquivo não existente!')
    }
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject('Impossível de ler o arquivo!')
      }
      const dataJson: IData = JSON.parse(data)
      if (dataJson.style && !newStyle) {
        resolve({ data: dataJson.style, status: 'ok' })
      } else {
        const newDataJson = JSON.stringify({
          login: dataJson.login,
          style: style,
        })
        fs.writeFile(filePath, newDataJson, error => {
          if (error) {
            reject('Error para fazer new data Json!')
          }
        })
        resolve({data: style, message: 'Registramos o seu novo tema!', status: 'ok' })
      }
    })
  })
}

const styleProcess = (style: IStyle, newStyle: boolean) => {
  return new Promise<IResultStatus<IStyle>>((resolve, reject) => {
    folderExists()
      .then(pathRoot => fileExists(pathRoot, 'data.json'))
      .then(filePath => styleExists(filePath, style, newStyle))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

export default styleProcess
