var pat = {
  GET: {
    id: Match.Optional(String),
  },
  PUT: {
    id: Match.Optional(String),
    data: Match.Optional(Object)
  },
  POST: {
    id: Match.Optional(String),
    data: Match.Optional(Object)
  },
  DELETE: {
    id: Match.Optional(String),
  },
}

var methods = {
  GET: function( context ) {
    check( context.params, pat.GET);
    this._context = context;
    console.log(' - GET - ');

    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );
    var config = FitAPI.runkeeper.getConfig;

    var uri = config.api_domain + endPoint.uri;

    if (context.params.id) {
      uri += '/' + context.params.id;
    }

    var request_headers = {
      method: context.method,
      headers: {
        'Accept': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri
    };

    return request_headers;
  },
  POST: function( context ) {
    check( context.params, pat.POST);
    this._context = context;
    console.log(' - POST - ');

    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );
    var config = FitAPI.runkeeper.getConfig();

    var uri = config.api_domain + endPoint.uri;

    if (context.params) {
      uri += '/' + context.params.id;
    }

    var request_headers = {
      method: context.method,
      headers: {
        'Accept': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri,
      data: context.data
    };

    return request_headers;
  },
  PUT: function( context ) {
    check( context.params, pat.PUT);
    this._context = context;
    console.log(' - PUT - ');   
    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );
    var config = FitAPI.runkeeper.getConfig();

    var uri = config.api_domain + endPoint.uri;

    if (context.params) {
      uri += '/' + context.params.id;
    }

    var request_headers = {
      method: context.method,
      headers: {
        'Accept': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: uri,
      data: context.data
    };

    return request_headers;
  },
  DELETE: function( context ) {
    check( context.params, pat.DELETE);
    this._context = context;
    console.log(' - DELETE - ');

    var endPoint = FitAPI.runkeeper.getEndPoint( context.endPoint );
    var config = FitAPI.runkeeper.getConfig();

    var request_headers = {
      method: context.method,
      headers: {
        'Accept': endPoint.content_type,
        'Authorization' : 'Bearer ' + config.access_token
      },
      uri: config.api_domain + endPoint.uri + '/' + context.params.id,
    };

    return request_headers;
  }
};

FitAPI.runkeeper.api = {}
FitAPI.runkeeper.api.methods = methods;