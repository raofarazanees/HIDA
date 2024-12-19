import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  message: 'this build targets snapshot and other non production environments',
  taskInboxUrl: 'https://task-mgmt-common.dev.singularity.clarivate.com/task-management/workflowtasks',
  hidaBaseUrl: 'https://hida-common.dev.singularity.clarivate.com/workbench-services/api',
  ontologyUrl: 'https://cl-ontology-common.dev.singularity.clarivate.com/ontology-master-content-hub-api',
  taskInboxApp: 'https://singularity-portal-dev.dev.singularity.clarivate.com'
};
