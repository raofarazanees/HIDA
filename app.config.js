module.exports = {
  appNamespace: 'hida',
  aws: {
    region: 'us-west-2',
    basePath: {
      stable: '', // the lack of protocol (http[s]) is important here, don't include it
      prod: '' // ex: '//d24dfggfd92k.cloudfront.net'
    }
  }
};
