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

let getAPIHeaders = ( options ) => {
  var context = {
    method: options.method,
    endPoint: options.endPoint,
    params: options.params || {}
  }
  return FitAPI[options.service]['api']['methods'][options.method](context);
}

let handleRequest = ( options ) => {
  check( options, Object);
  check( options, pat);

  var request_headers = getAPIHeaders( options );
  console.log('------- HEADERS --------');
  console.log(request_headers);
  console.log('------- // --------');

//   HTTP.call(request_headers.method, request_headers.uri, {headers: request_headers.headers}, function (error, result) {
//     if (!error) {
//       console.log(result)
//     }
//   });

};

FitAPI.common.request = handleRequest;