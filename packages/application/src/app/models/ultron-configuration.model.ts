import {injectable} from 'inversify';

@injectable()
export class UltronConfiguration {
  work: string = 'c:\\bidon\\ultron';
  app: string = '';
  data: string = '';
  extra: string = '';
  config: string = '';

  isDev: boolean = true;
}
