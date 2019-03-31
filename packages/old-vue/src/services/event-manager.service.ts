import { emit } from 'eiphop';

export class EventManager {
  constructor() {
    if (typeof window.require === 'undefined') {
      return;
    }
  }

  public getApplications() {
    emit('get-applications')
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err));
  }
}

export const EventManagerService = new EventManager();
