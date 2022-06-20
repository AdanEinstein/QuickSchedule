import { IData, IFinance, IResultStatus } from '.'
import { IStyle } from '../contexts/ThemeContext'
import fs from 'fs'
import { fileExists, folderExists } from './processLogin'

const newFinance = (
  filePath: string,
  finance: IFinance,
  existsFinance?: boolean,
  deleteFinance?: boolean
): Promise<IResultStatus<IFinance>> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject('Arquivo não existente!')
    }
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject('Impossível de ler o arquivo!')
      }
      let dataJson: IFinance[] = JSON.parse(data)
      if (dataJson) {
        if (existsFinance) {
          if (deleteFinance) {
            dataJson = dataJson.filter(current => finance.id != current.id)
          } else {
            dataJson = dataJson.map(current => {
              if(current.id === finance.id){
                return finance
              }else{
                return current
              }
            })
          }
        } else {
          dataJson.push(finance)
        }
        const dataJsonStringify = JSON.stringify(dataJson)
        fs.writeFile(filePath, dataJsonStringify, error => {
          if (error) {
            reject('Error para fazer new data Json!')
          }
        })
        resolve({
          data: finance,
          message: 'Registro efetuado com sucesso!',
          status: 'ok',
        })
      } else {
        const newDataJson = JSON.stringify([finance])
        fs.writeFile(filePath, newDataJson, error => {
          if (error) {
            reject('Error para fazer new data Json!')
          }
        })
        resolve({
          data: finance,
          message: 'Registro efetuado com sucesso!',
          status: 'ok',
        })
      }
    })
  })
}

const listFinance = (filePath: string): Promise<IResultStatus<IFinance[]>> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject('Arquivo não existente!')
    }
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject('Impossível de ler o arquivo!')
      }
      const dataJson: IFinance[] = JSON.parse(data)
      if (dataJson) {
        resolve({
          data: dataJson,
          message: 'Listagem concluída!',
          status: 'ok',
        })
      } else {
        resolve({
          data: [],
          message: 'Listagem vazia!',
          status: 'ok',
        })
      }
    })
  })
}

export const newFinanceProcess = (
  finance: IFinance,
  ano: string,
  mes: string
) => {
  return new Promise<IResultStatus<IFinance>>((resolve, reject) => {
    folderExists(`ano_${ano}`)
      .then(pathRoot => fileExists(pathRoot, `mes_${mes}.json`, true))
      .then(filePath => newFinance(filePath, finance))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

export const listFinanceProcess = (ano: string, mes: string) => {
  return new Promise<IResultStatus<IFinance[]>>((resolve, reject) => {
    folderExists(`ano_${ano}`)
      .then(pathRoot => fileExists(pathRoot, `mes_${mes}.json`, true))
      .then(filePath => listFinance(filePath))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

export const editFinanceProcess = (
  finance: IFinance,
  ano: string,
  mes: string
) => {
  return new Promise<IResultStatus<IFinance>>((resolve, reject) => {
    folderExists(`ano_${ano}`)
      .then(pathRoot => fileExists(pathRoot, `mes_${mes}.json`, true))
      .then(filePath => newFinance(filePath, finance, true))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

export const deleteFinanceProcess = (
  finance: IFinance,
  ano: string,
  mes: string
) => {
  return new Promise<IResultStatus<IFinance>>((resolve, reject) => {
    folderExists(`ano_${ano}`)
      .then(pathRoot => fileExists(pathRoot, `mes_${mes}.json`, true))
      .then(filePath => newFinance(filePath, finance, true, true))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}
