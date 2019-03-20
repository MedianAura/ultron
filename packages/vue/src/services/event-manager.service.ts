export class EventManager {
  private ipcRenderer: any = undefined;
  public resolve: any = undefined

  constructor() {
    if (typeof window.require === 'undefined') {
      return;
    }

    this.ipcRenderer = window.require('electron').ipcRenderer;

    this.ipcRenderer.on('talkie-walkie', (event: any, arg: any) => {
      console.log(arg); // prints "pong"
      this.resolve(arg.response)
    });
  }

  send(message: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.ipcRenderer.send('talkie-walkie', message);
      this.resolve = resolve
    });
  }
}

export const EventManagerService = new EventManager();
