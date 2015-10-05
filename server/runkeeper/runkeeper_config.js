let _defaults = {
  config: {
    // Access Token (Optional, defaults to null):
    access_token : "< access token >",

    // API Domain (Optional, default will work for most apps):
    api_domain : "https://api.runkeeper.com",
  },
  endPoints: {
    "user": {
      "content_type": "application/vnd.com.runkeeper.User+json",
      "uri": "/user"
    },
    "profile": {
      "content_type": "application/vnd.com.runkeeper.Profile+json",
      "uri": "/profile",
      "pat": {
        "athlete_type": Match.OneOf(
          'Athlete', 'Runner', 
          'Marathoner', 'Ultra Marathoner', 
          'Cyclist', 'Tri-Athlete', 'Walker', 
          'Hiker', 'Skier', 'Snowboarder', 
          'Skater', 'Swimmer', 'Rower'
        )
      }
    },
    "settings": {
      "content_type": "application/vnd.com.runkeeper.Settings+json",
      "uri": "/settings",
      "pat": {
        "share_fitness_activities": Match.OneOf("Just Me", "Street Team", "Everyone"),
        "share_map": Match.OneOf("Just Me", "Street Team", "Everyone"),
        "post_fitness_activity_facebook": Match.Optional(Boolean),
        "post_fitness_activity_twitter": Match.Optional(Boolean),
        "post_live_fitness_activity_facebook": Match.Optional(Boolean),
        "post_live_fitness_activity_twitter": Match.Optional(Boolean),
        "share_background_activities": Match.Optional(Boolean),
        "post_background_activity_facebook": Match.Optional(Boolean),
        "post_background_activity_twitter": Match.Optional(Boolean),
        "share_sleep": Match.OneOf("Just Me", "Street Team", "Everyone"),
        "post_sleep_facebook": Match.Optional(Boolean),
        "post_sleep_twitter": Match.Optional(Boolean),
        "share_nutrition": Match.OneOf("Just Me", "Street Team", "Everyone"),
        "post_nutrition_facebook": Match.Optional(Boolean),
        "post_nutrition_twitter": Match.Optional(Boolean),
        "share_weight": Match.OneOf("Just Me", "Street Team", "Everyone"),
        "post_weight_facebook": Match.Optional(Boolean),
        "post_weight_twitter": Match.Optional(Boolean),
        "share_general_measurements":Match.OneOf("Just Me", "Street Team", "Everyone"),
        "post_general_measurements_facebook": Match.Optional(Boolean),
        "post_general_measurements_twitter": Match.Optional(Boolean),
        "share_diabetes": Match.OneOf("Just Me", "Street Team", "Everyone"),
        "post_diabetes_facebook": Match.Optional(Boolean),
        "post_diabetes_twitter": Match.Optional(Boolean),
        "distance_units": Match.OneOf("mi", "km"),
        "weight_units":  Match.OneOf("lbs", "kg"),
        "first_day_of_week": Match.OneOf("Sunday", "Monday")
      }
    },
    "fitnessActivityFeed": {
      "content_type": "application/vnd.com.runkeeper.FitnessActivityFeed+json",
      "uri": "/fitnessActivities"
    },
    "fitnessActivities": {
      "content_type": "application/vnd.com.runkeeper.FitnessActivity+json",
      "uri": "/fitnessActivities",
      "pat": {
        "type": Match.Optional(
          Match.OneOf(
            'Running', 'Cycling', 'Mountain Biking',
            'Walking', 'Hiking', 'Downhill Skiing ', 
            'Cross-Country Skiing', 'Snowboarding', 
            'Skating', 'Swimming', 'Wheelchair', 
            'Rowing', 'Elliptical', 'Other', 'Yoga', 
            'Pilates', 'CrossFit', 'Spinning', 'Zumba', 
            'Barre', 'Group Workout', 'Dance', 'Bootcamp',
            'Boxing / MMA', 'Meditation', 'Strength Training', 
            'Circuit Training', 'Core Strengthening', 
            'Arc Trainer', 'Stairmaster / Stepwell', 
            'Sports', 'Nordic Walking'
          )
        ),
        "secondary_type": Match.Optional(String),
        "equipment": Match.Optional(
          Match.OneOf(
            'None', 'Treadmill', 'Stationary Bike',
            'Elliptical', 'Row Machine')
        ),
        "start_time": Match.Optional(String), //Sat, 1 Jan 2011 00:00:00
        "total_distance": Match.Optional(Number),
        "distance": Match.Optional(Object), // {timestamp: Number, distance: Number}
        "duration": Match.Optional(Number),
        "average_heart_rate": Match.Optional(Number),
        "heart_rate": Match.Optional(Object), // {timestamp: Number, heart_rate: Number}
        "notes":  Match.Optional(String),
        "path": Match.Optional(Object), 
        // {timestamp: Number, latitude: Number, longitude: Number, 
        // altitude: Number, type: Match.OneOf('start', 'end', 'gps', 'pause', 'resume', 'manual')}
      }
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
FitAPI.runkeeper = {
  getConfig: getDefaults('config'),
  getEndPoints: getDefaults('endPoints'),
  getEndPoint: getEndPoint,
  init:  init
};
