/*
 * Use this file to set Content-Security Policy header to limit which hosts can
 * embed your UI into an <iframe> so as to prevent "clickjacking".
 * https://jira.clarivate.io/browse/CDX-227
 *
 * FRAME_ANCESTORS: [
 *   'https://*.publons.com:*',
 *   'https://example.com:*',
 *   'http://example.com:*'
 * ]
 *
 */

module.exports = {
  FRAME_ANCESTORS: []
};
