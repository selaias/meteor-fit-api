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

    var config = FitAPI.runkeeper.getConfig;

    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );

    var uri = config.api_domain + endPoint.uri;

    if (context.params.id) {
      uri += '/' + context.params.id;
    }

    var request_arguments = {
      method: context.method,
      headers: {
        'Accept': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri
    };

    return request_arguments;
  },
  POST: function( context ) {
    check( context.params, pat.POST);
//     console.log(' - POST - ');

    var config = FitAPI.runkeeper.getConfig;

    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );

    var uri = config.api_domain + endPoint.uri;

    if (context.params) {
      uri += '/' + context.params.id;
    }

    check( context.params.data, endPoint.pat);

    var request_arguments = {
      method: context.method,
      headers: {
        'Content-Type': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri,
      data: context.params.data
    };

    return request_arguments;
  },
  PUT: function( context ) {
    check( context.params, pat.PUT);
//     console.log(' - PUT - ');   

    var config = FitAPI.runkeeper.getConfig;
    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );

    check( context.params.data, endPoint.pat);
    
    var uri = config.api_domain + endPoint.uri +'/' + context.params.id;

    var request_arguments = {
      method: context.method,
      headers: {
        'Content-Type': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri,
      data: context.params.data
    };

    return request_arguments;
  },
  DELETE: function( context ) {
    check( context.params, pat.DELETE);
//     console.log(' - DELETE - ');

    var config = FitAPI.runkeeper.getConfig;

    var request_arguments = {
      method: context.method,
      headers: {
        'Accept': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: config.api_domain + endPoint.uri + '/' + context.params.id,
    };

    return request_arguments;
  }
};

FitAPI.runkeeper.api = {}
FitAPI.runkeeper.api.methods = methods;