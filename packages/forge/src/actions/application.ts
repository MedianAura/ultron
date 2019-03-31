import { Core } from '@ultron/application';

export const actions = {
  'get-applications': (req: any, res: any) => {
    res.send({ applications: Core.getApplications() });
  },
  'set-application': (req: any, res: any) => {
    // res.send({ applications: Core.applications })
  },
  'set-recipe': (req: any, res: any) => {
    // res.send({ applications: Core.applications })
  },
  'set-version': (req: any, res: any) => {
    // res.send({ applications: Core.applications })
  },
};
