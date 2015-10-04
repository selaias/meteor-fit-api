let _defaults = {
  config: {
    // Access Token (Optional, defaults to null):
    access_token : "< access token >",

    // API Domain (Optional, default will work for most apps):
    api_domain : "api.runkeeper.com",
  },
  endPoints: {
    "user": {
      "content_type": "application/vnd.com.runkeeper.User+json",
      "uri": "/user"
    },
    "profile": {
      "content_type": "application/vnd.com.runkeeper.Profile+json",
      "uri": "/profile"
    },
    "settings": {
      "content_type": "application/vnd.com.runkeeper.Settings+json",
      "uri": "/settings"
    },
    "fitnessActivityFeed": {
      "content_type": "application/vnd.com.runkeeper.FitnessActivityFeed+json",
      "uri": "/fitnessActivities"
    },
    "fitnessActivities": {
      "content_type": "application/vnd.com.runkeeper.FitnessActivity+json",
      "uri": "/fitnessActivities"
    },
  }
};

let getDefaults = ( type ) => {
  return _defaults[ type ];
};

let init = ( options ) => {
  check(options, Match.Optional( Object ) );

  options = options != undefined ? options : {};
  
  FitAPI.runkeeper.config = _.extend(getDefaults('config'), options.config || {} );
  FitAPI.runkeeper.endPoints = _.extend(getDefaults('endPoints'), options.endPoints || {});
};


FitAPI.runkeeper.config = getDefaults('config');
FitAPI.runkeeper.endPoints = getDefaults('endPoints');
FitAPI.runkeeper.init = init;