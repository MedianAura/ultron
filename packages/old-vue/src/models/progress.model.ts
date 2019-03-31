export class Progress {
  maxSteps: number = 100;
  actualStep: number = 1;
  actionName: string = '';
  actionParams: string = '';
  actionCompleted: boolean = false;

  constructor(options: Progress | null) {
    if (options === null) {
      return;
    }
    if (typeof options.maxSteps !== 'undefined') {
      this.maxSteps = options.maxSteps;
    }
    if (typeof options.actualStep !== 'undefined') {
      this.actualStep = options.actualStep;
    }
    if (typeof options.actionName !== 'undefined') {
      this.actionName = options.actionName;
    }
    if (typeof options.actionParams !== 'undefined') {
      this.actionParams = options.actionParams;
    }
  }
}
