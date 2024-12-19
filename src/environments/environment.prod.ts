import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  message: 'this build targets QA and Production environments',
  production: true,
  taskInboxUrl: '%%taskInboxUrl%%',
  ontologyUrl: '%%ontologyUrl%%',
  hidaBaseUrl: '%%hidaBaseUrl%%',
  taskInboxApp: '%%taskInboxApp%%'
};
