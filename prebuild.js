const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const branch = process.env.GIT_BRANCH || 'develop';
const environment = branch.indexOf('master') >= 0 || branch.indexOf('rc-') >= 0 ? 'prod' : 'dev';

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentFileName = path.join(environmentFilesDirectory, `environment.${environment}.ts`);
const environmentFileName = path.join(environmentFilesDirectory, 'environment.ts');

fs.copyFile(targetEnvironmentFileName, environmentFileName, (err) => {
  // console.log(`BRANCH DETECTED WAS: ${environment}`); // eslint-disable-line no-console
  // console.log(`ENVIRONMENT FILE USED WAS: ${targetEnvironmentFileName}`); // eslint-disable-line no-console

  if (err) {
    throw err;
  }
});
