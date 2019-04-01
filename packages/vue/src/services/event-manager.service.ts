import { Application } from '@ultron/application/src/app/models/application.model';
import { JsonFactoryService } from '@ultron/application/src/app/services/json-factory.service';
import { emit } from 'eiphop';

export class EventManager {
  constructor() {
    if (typeof window.require === 'undefined') {
      return;
    }
  }

  public getApplications() {
    emit('get-applications')
      .then((res: any) => {
        const apps = JsonFactoryService.getJsonConverter().deserializeArray(res.applications, Application);
      })
      .catch((err: any) => console.log(err));
  }
}

export const EventManagerService = new EventManager();
