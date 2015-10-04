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
  
  api.use('ecmascript', 'server');
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('check', 'server');
  api.use('random', 'server');  
  api.imply('service-configuration', 'server');
  
  api.addFiles('server/_modules.js', 'server');
 
  
  api.addFiles('server/fit-api.js', 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/runkeeper/config.js', 'server');
  api.addFiles('server/runkeeper/api.js', 'server');
  
  api.export('FitAPI', both);
});