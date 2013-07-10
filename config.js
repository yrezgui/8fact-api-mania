var config = require('config-env').define('NODE_ENV', function (config) {
  config.common({
    name: '8fact-api-mania',
    // Express port
    express_port: 3008,
    // Facebook Graph API Endpoint
    facebook_api_endpoint: 'https://graph.facebook.com/',
    // Facebook Page Feed
    facebook_page: '8fact',
    // Facebook Page Feed
    default_results_limit: 10
  });
  
  config.config('development', {
    // Facebook App Id
    facebook_app_id: '123456789',
    // Facebook App Secret
    facebook_app_secret: 'FAKEAPPSECRET'
  });
});

module.exports = config;
