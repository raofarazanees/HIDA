/* eslint no-console: 0 */
const cors = require('cors');
const debug = require('debug');
const Eureka = require('@sp/node-component-eureka');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const fallback = require('express-history-api-fallback');
const minimist = require('minimist');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const log = debug('server-runner');
// this file is moved to the cwd at deploy time
const appConfig = require('./app.config');

const app = express();
const admin = express();
const argv = minimist(process.argv.slice(2));
const environment = Eureka.environment();
const eurekaClient = Eureka.client();

const appName = appConfig.appNamespace || '';
const csp = require('./content-security-policy');
const hasValidCspAncestorHeaders = csp && csp.FRAME_ANCESTORS && csp.FRAME_ANCESTORS.length >= 1;
const isLocalDevelopment = process.env.LOCAL_SERVE === 'true';

let webRoot = path.resolve(__dirname, '..', `web/${appName}`);
let root = webRoot;

if (isLocalDevelopment) {
  // route API requests to snapshot
  // http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
  app.use('/api', proxy({ target: 'http://apps.dev-snapshot.clarivate.com', changeOrigin: true }));

  // would be nice to figure this out
  // https://jira.clarivate.io/browse/WEBTLKT-1588
  webRoot = path.resolve(__dirname, '..', 'web');
  root = `${webRoot}/${appName}`;
}

const proxyTarget = process.env.PROXY_TARGET || '';
const serverPort = process.env.SERVER_PORT || environment.SERVER_PORT;
const adminPort = process.env.ADMIN_PORT || environment.ADMIN_PORT;
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,OPTIONS',
  preflightContinue: true
};
const logger = function (req, res, next) {
  // console.log(`URL: ${req.url} static URL: ${webRoot}${req.url}`);
  next();
};

module.exports = {
  app,
  admin
};

// console.log('isLocalDevelopment: ', isLocalDevelopment);
// console.log('root: ', root);
// console.log('pwd: ', __dirname);
// console.log('web root: ', webRoot);
// console.log('appName: ', appName);
// console.log('point: ', webRoot);

if (hasValidCspAncestorHeaders) {
  const cspAncestorHeaders = csp.FRAME_ANCESTORS.join(' ');

  app.use('/*', (req, res, next) => {
    res.setHeader('Content-Security-Policy', `frame-ancestors ${cspAncestorHeaders}`);
    next();
  });
}

app.use(logger);
app.use(cors(corsOptions));
app.use(
  expressStaticGzip(webRoot, {
    index: false,
    orderPreference: ['gzip'],
    setHeaders: (res, path) => {
      if (!path.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  })
);
app.use(fallback('index.html', { root: root }));

if (isLocalDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common', { skip: (req, res) => res.statusCode < 400 }));
}

if (proxyTarget) {
  try {
    let data = Buffer.from(proxyTarget, 'base64').toString('utf8');
    let cliOptions = JSON.parse(data);

    installProxy(cliOptions);
  } catch (error) {
    log(`Error: ${error}`);
  }
} else {
  let cliOptions = getProxyCliOptions();

  if (typeof cliOptions.target === 'string') {
    installProxy(cliOptions);
  }
}

if (serverPort === environment.SERVER_PORT) {
  log(`Using default server port: ${environment.SERVER_PORT}`);
}

if (adminPort !== environment.ADMIN_PORT) {
  log(`Using custom admin port: ${environment.ADMIN_PORT}`);
}

if (!environment.CLOUD_APP) {
  log('Cloud App name is not provided!!!');
}

app.listen(serverPort, () => {
  log(`listening: ${serverPort}`);

  if (!isLocalDevelopment) {
    eurekaClient.startClient((client) => {}); // eslint-disable-line no-unused-vars
  }
});

admin.get('/healthcheck', (req, res) => {
  res.sendStatus(200);

  log('healthcheck called');
});

admin.listen(adminPort, () => {
  log('Admin healthcheck endpoint is up');
});

function getProxyCliOptions() {
  return {
    target: argv.proxy || argv.P
  };
}

function installProxy(options) {
  log(`installing proxy with options: ${JSON.stringify(options)}`);

  try {
    const proxyMiddleware = require('http-proxy-middleware');
    const configuredProxy = proxyMiddleware(options);

    app.use(configuredProxy);
  } catch (error) {
    log(`Error: ${error}`);
  }
}
