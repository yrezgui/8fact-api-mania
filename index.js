// Module dependencies
var express = require('express');
var request = require('request');

// Application settings
var config  = require('./config.js');

// Main function
var main = function main(accessToken) {
  // Initialize an express instance
  var app = module.exports = express();

  app.get('/', function index(req, res){

    // Allow cross domain requests
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');

    req.query.limit = req.query.limit || config.param('default_results_limit');

    var url = config.param('facebook_api_endpoint') + config.param('facebook_page') + '/feed?fields=type,created_time,link,picture&limit=' + req.query.limit + '&access_token=' + accessToken;

    request(url, function (error, response, body) {
      var content = JSON.parse(body);
      delete content.paging;

      for(var i = 0; i < content.data.length; i++) {
        // Return bigger image size
        if(content.data[i].type == 'photo')
          content.data[i].picture = content.data[i].picture.replace('s.png', 'b.png');
      }

      res.jsonp(content);
    });
  });

  var port = config.param('express_port');
  app.listen(port);
  console.log('\n  listening on port ' + port + '\n');

  if(process.env['NODE_ENV'] == 'development') {
    var open = require('open');
    open('http://localhost:' + port);
  }
};

// Generate URL to get access token
var accessTokenUrl = config.param('facebook_api_endpoint') + 'oauth/access_token?client_id=' + config.param('facebook_app_id') + '&client_secret=' + config.param('facebook_app_secret') + '&grant_type=client_credentials';

request(accessTokenUrl, function (error, response, body) {

  if (!error && response.statusCode == 200) {

    var accessToken = body.split('=')[1] || null;
    main(accessToken);
  }
});