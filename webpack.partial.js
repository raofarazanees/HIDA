/* eslint-disable no-console */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const jsonfile = require('jsonfile');
const path = require('path');
const SemverWebpackPlugin = require('semver-webpack-plugin');
const simpleGit = require('simple-git')(__dirname);
const WebpackAutoInject = require('webpack-auto-inject-version');

// based on the Shared Platform CI / CD Pipeline Release Process
// https://wiki.clarivate.io/display/DEVOPS/Release+Cycle
// https://wiki.clarivate.io/display/DEVOPS/Release+Cycle+Walkthrough
const currentBranch = process.env.GIT_BRANCH ? process.env.GIT_BRANCH : '';
const releaseVersion = process.env.APPLICATION_VERSION;
const hasReleaseVersion = releaseVersion !== undefined;
const isBuildingAgainstOriginMaster = currentBranch === 'origin/master';
const isBuildingAgainstMaster = currentBranch === 'master';
const isBuildingAgainstDevelop = currentBranch === 'origin/develop';
const isBuildingAgainstReleaseCandidate = currentBranch.indexOf('rc-') >= 0;
const isMergingReleaseCandidateBranch = process.env.BRANCH && process.env.BRANCH.indexOf('rc-') >= 0;
const isMergeJobReleaseContext = isMergingReleaseCandidateBranch && hasReleaseVersion;
const isReleaseJobReleaseContext = isBuildingAgainstOriginMaster && !isMergingReleaseCandidateBranch;
const isStableJobReleaseContext = isBuildingAgainstMaster && hasReleaseVersion;
const isStableJobPreReleaseContext = isBuildingAgainstReleaseCandidate && !hasReleaseVersion;

console.log('$APPLICATION_VERSION', process.env.APPLICATION_VERSION);
console.log('$GIT_BRANCH', currentBranch);
console.log('releaseVersion', releaseVersion);
console.log('hasReleaseVersion', hasReleaseVersion);
console.log('isBuildingAgainstMaster', isBuildingAgainstMaster);
console.log('isBuildingAgainstDevelop', isBuildingAgainstDevelop);
console.log('isBuildingAgainstReleaseCandidate', isBuildingAgainstReleaseCandidate);
console.log('isMergeJobReleaseContext', isMergeJobReleaseContext);
console.log('isStableJobPreReleaseContext', isStableJobPreReleaseContext);
console.log('isStableJobReleaseContext', isStableJobReleaseContext);
console.log('isReleaseJobReleaseContext', isReleaseJobReleaseContext);

const releasePlugins = [];

if (isMergeJobReleaseContext) {
  // we are releasing to production and in the context of the release job
  // set package.json version to $APPLICATION_VERSION and commit our change
  console.log('MERGE JOB RUNNING IN RELEASE PIPELINE CONTEXT');

  const packageJsonPath = path.join(__dirname, './package.json');
  let packageJson = jsonfile.readFileSync(packageJsonPath);

  packageJson.version = releaseVersion;

  jsonfile.writeFileSync(packageJsonPath, packageJson, { spaces: 2 });
  simpleGit.commit('bumping to next release version', ['package.json']);
} else if (isStableJobPreReleaseContext || isStableJobReleaseContext) {
  console.log('STABLE JOB RUNNING IN A RELEASE OR PRE-RELEASE PIPELINE CONTEXT...');
  // we are releasing to stable for QA or we are releasing to production (coming from a release job)
  // we will want to have webpack do some work for us

  // if we are releasing to stable for QA, we want to pre-release by bumping package.json's version to an -rc.N suffix
  if (isStableJobPreReleaseContext) {
    console.log('STABLE JOB RUNNING IN PRE-RELEASE PIPELINE CONTEXT, RC BUMP');

    releasePlugins.push(
      new SemverWebpackPlugin({
        files: [path.resolve(__dirname, 'package.json')],
        incArgs: ['prerelease', 'rc']
      })
    );

    // commit our change to package.json
    simpleGit.commit('bumping to next release candidate version', ['package.json']);
  } else {
    console.log('STABLE JOB RUNNING IN RELEASE PIPELINE CONTEXT');
  }

  // note: our files get cdnized in cdnize.js
  releasePlugins.push(
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false
      }
    })
  );
} else if (isReleaseJobReleaseContext) {
  console.log('RELEASE JOB RUNNING IN RELEASE PIPELINE CONTEXT, NO ACTIONS NEEDED (noop)');
} else {
  console.log('CONTEXT UNDETERMINED, MOST LIKELY A PR or SNAPSHOT BUILD');
}

module.exports = {
  plugins: [
    ...releasePlugins,

    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html|\.json$/
    }),

    new BundleAnalyzerPlugin({
      // https://jira.clarivate.io/browse/CDX-633
      reportFilename: path.join(process.cwd(), 'reports', 'bundle-analyzer', 'report.html'),
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};
