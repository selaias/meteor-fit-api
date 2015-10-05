Package.describe({
  name: 'selaias:fit-api',
  version: '0.1.0',
  summary: 'Fitness API support for Runkeeper, Strava, MapMyFitness, UnderArmour, Fitbit.',
  git: 'https://github.com/selaias/meteor-fit-api.git',
  documentation: 'README.md'
});

var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  
  api.use('ecmascript@0.1.4', 'server');
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('check', 'server');
  api.imply('service-configuration', 'server');
  
  api.addFiles('server/_modules.js', 'server');
 
  
  api.addFiles('server/fit-api.js', 'server');
  api.addFiles('server/methods.js', 'server');
  
  api.addFiles('server/runkeeper/runkeeper_config.js', 'server');
  api.addFiles('server/runkeeper/runkeeper_api.js', 'server');
  
  api.addFiles('server/strava/strava_config.js', 'server');
  api.addFiles('server/strava/strava_api.js', 'server');
  
  api.export('FitAPI', both);
});
