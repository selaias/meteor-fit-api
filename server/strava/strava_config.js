let _defaults = {
  config: {
    // Access Token (Optional, defaults to null):
    access_token : "< access token >",
    
    athleteId: "< strava athlete id>",

    // API Domain (Optional, default will work for most apps):
    api_domain : "https://www.strava.com/api",
    
    // API version
    api_version : "/v3"
  },
  endPoints: {
    "athlete": {
      "uri": "/athletes"
    },
    "activities": {
      "uri": "/activities"
    },
    "clubs": {
      "uri": "/clubs"
    },
    "segments": {
      "uri": "/segments"
    },
    "uploads": {
      "uri": "/uploads"
    },
  }
};

let getDefaults = ( type ) => {
  return _defaults[ type ] || {};
};

let getEndPoint = ( type ) => {
  var endPoints = _defaults.endPoints;

  if (_.has(endPoints, type)) {
    return  _defaults.endPoints[ type ];
  } else {
    throw new Meteor.Error('500', 'EndPoint does not exist! Please check your request.');
  }    
};

let init = ( options ) => {
  check(options, Match.Optional( Object ) );

  options = options != undefined ? options : {};
  
  _defaults.config = _.extend(getDefaults('config'), options.config || {} );
  _defaults.endPoints = _.extend(getDefaults('endPoints'), options.endPoints || {});
};

/*
*  Exports
*/
FitAPI.strava = {
  getConfig: getDefaults('config'),
  getEndPoints: getDefaults('endPoints'),
  getEndPoint: getEndPoint,
  init:  init
};
