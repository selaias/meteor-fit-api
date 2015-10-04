Package.describe({
  name: 'selaias:fit-api',
  version: '0.0.1',
  summary: 'Brining Fitness APIs together ',
  git: 'https://github.com/selaias/meteor-fit-api.git',
  documentation: 'README.md'
});

var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  
  api.use('ecmascript', both);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('check', both);
  api.use('random', both);
  
  
  api.use('service-configuration', both);
  
  api.addFiles('both/fit-api.js');
  
  api.addFiles('client/runkeeper/config.js');
  api.addFiles('client/runkeeper/setup.js');
  api.addFiles('client/runkeeper/methods.js');
  
  api.export('FitAPI', both);
});