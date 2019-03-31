import { setupMainHandler } from 'eiphop';
import electron from 'electron';
import { actions } from './actions/application';

setupMainHandler(electron, { ...actions }, true);
