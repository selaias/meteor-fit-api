/*
  *  Options pattern. At this point we are interested just for service, method and endPoint
  *  Parameters are agnostic at this level
 */
var pat = {
  service: String,
  method: Match.OneOf('GET', 'POST', 'PUT', 'DELETE'),
  endPoint: String,
  params: Match.Optional(Object)
};

let getAPIArguments = ( options ) => {
  var context = {
    method: options.method,
    endPoint: options.endPoint,
    params: options.params || {}
  }
  return FitAPI[options.service]['api']['methods'][options.method](context);
}

let handleRequest = ( options, callback ) => {
  check( options, Object);
  check( options, pat);

  try {
    var request_arguments = getAPIArguments( options );
    
//     console.log('------- DEBUG HEADERS --------');
//     console.log(request_arguments);
//     console.log('-------      //      --------');
    
    var requestResult = HTTP.call(
      request_arguments.method, 
      request_arguments.uri, {
        headers: request_arguments.headers, 
        data: request_arguments.data
      }
    );
    return requestResult.content;
  } catch ( e ) {
    throw new Meteor.Error( e.error, e.message );
  }
};

FitAPI.common.request = handleRequest;