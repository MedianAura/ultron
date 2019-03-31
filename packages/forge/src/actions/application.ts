import { Core } from '@ultron/application/src/main';

export const actions = {
  'get-applications': (req: any, res: any) => {
    res.send({ applications: Core.applications });
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
