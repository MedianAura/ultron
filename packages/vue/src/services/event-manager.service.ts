import { Application } from '@ultron/application/dist/app/models/application.model';
import { emit } from 'eiphop';

export class EventManager {
  constructor() {
    if (typeof window.require === 'undefined') {
      return;
    }
  }

  public getApplications() {
    emit('get-applications')
      .then((res: Application[]) => console.log(res))
      .catch((err: any) => console.log(err));
  }
}

export const EventManagerService = new EventManager();
