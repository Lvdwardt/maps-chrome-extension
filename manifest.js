import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: [
        'https://www.google.at/*',
        'https://www.google.be/*',
        'https://www.google.bg/*',
        'https://www.google.co.jp/*',
        'https://www.google.co.uk/*',
        'https://www.google.com.au/*',
        'https://www.google.com/*',
        'https://www.google.cy/*',
        'https://www.google.cz/*',
        'https://www.google.de/*',
        'https://www.google.dk/*',
        'https://www.google.ee/*',
        'https://www.google.es/*',
        'https://www.google.fi/*',
        'https://www.google.fr/*',
        'https://www.google.gr/*',
        'https://www.google.hr/*',
        'https://www.google.hu/*',
        'https://www.google.ie/*',
        'https://www.google.it/*',
        'https://www.google.lt/*',
        'https://www.google.lu/*',
        'https://www.google.lv/*',
        'https://www.google.mt/*',
        'https://www.google.nl/*',
        'https://www.google.pl/*',
        'https://www.google.pt/*',
        'https://www.google.ro/*',
        'https://www.google.se/*',
        'https://www.google.si/*',
        'https://www.google.sk/*',
      ],
      js: ['src/pages/contentInjected/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
