var config = require('config-env').define('NODE_ENV', function (config) {
  config.common({
    name: '8fact-api-mania',
    // Express port
    express_port: 3008,
  });
  
  config.config('development', {
    // Facebook Graph API Endpoint
    facebook_api_endpoint: 'https://graph.facebook.com/'
    // Facebook App Id
    facebook_app_id: '123456789',
    // Facebook App Secret
    facebook_app_secret: 'FAKEAPPSECRET'
    // Facebook Page Feed
    facebook_page: '8fact'
  });
});

module.exports = config;
