var pat = {
  GET: {
    id: Match.Optional(String),
  },
  PUT: {
    id: String,
    data: Object
  },
  POST: {
    id: Match.Optional(String),
    data: Object
  },
  DELETE: {
    id: Match.Optional(String),
  },
}

var methods = {
  GET: function( context ) {
    check( context.params, pat.GET);
    //     console.log(' - GET - ');

    var config = FitAPI.strava.getConfig;
    var endPoint = FitAPI.strava.getEndPoint( context.endPoint );

    var uri = config.api_domain + config.api_version + endPoint.uri;

    if (context.params.id) {
      uri += '/' + context.params.id;
    }

    var request_headers = {
      method: context.method,
      headers: {
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri
    };

    return request_headers;
  },
  POST: function( context ) {
    check( context.params, pat.POST);
//     console.log(' - POST - ');

    var config = FitAPI.strava.getConfig;
    var endPoint = FitAPI.strava.getEndPoint( context.endPoint );

    var uri = config.api_domain + config.api_version + '/' + endPoint.uri;

    if (context.params) {
      uri += '/' + context.params.id;
    }

    var request_headers = {
      method: context.method,
      headers: {
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri,
      data: context.params.data
    };

    return request_headers;
  },
  PUT: function( context ) {
    check( context.params, pat.PUT);
//     console.log(' - PUT - ');   
    
    var config = FitAPI.strava.getConfig;
    var endPoint = FitAPI.strava.getEndPoint( context.endPoint );

    var uri = config.api_domain + config.api_version + endPoint.uri;

    if (context.params) {
      uri += '/' + context.params.id;
    }

    var request_headers = {
      method: context.method,
      headers: {
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri,
      data: context.params.data
    };

    return request_headers;
  },
  DELETE: function( context ) {
    check( context.params, pat.DELETE);
//     console.log(' - DELETE - ');

    var config = FitAPI.strava.getConfig;
    var endPoint = FitAPI.strava.getEndPoint( context.endPoint );

    var request_headers = {
      method: context.method,
      headers: {
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: config.api_domain + endPoint.uri + config.api_version + '/' + context.params.id,
    };

    return request_headers;
  }
};

FitAPI.strava.api = {}
FitAPI.strava.api.methods = methods;