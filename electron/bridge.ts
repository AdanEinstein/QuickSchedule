import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (channel: string, message: any) => {
    ipcRenderer.send(channel, message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, data) => callback(event, data))
  }
}

contextBridge.exposeInMainWorld('Main', api)