let _defaults = {
  config: {
    // Access Token (Optional, defaults to null):
    access_token : "< access token >",
    
    athleteId: "< strave athlete id>",

    // API Domain (Optional, default will work for most apps):
    api_domain : "https://api.strava.com",
    
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

let init = ( options ) => {
  check(options, Match.Optional( Object ) );

  options = options != undefined ? options : {};
  
  _defaults.config = _.extend(getDefaults('config'), options.config || {} );
  _defaults.endPoints = _.extend(getDefaults('endPoints'), options.endPoints || {});
};

let getEndPoint = ( type ) => {
  return _defaults.endPoints[ type ] || {};
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
