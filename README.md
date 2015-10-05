# fit-api

Fitness API support for Runkeeper, Strava, MapMyFitness, UnderArmour, Fitbit.


## Compatibility

Fitness API is currently compatible with Meteor 1.2.0.1 and above.

## Installation

```
meteor add selaias:fit-api
```

Optional packages to use for authentication:

```
meteor add selaias:accounts-runkeeper

meteor add selaias:accounts-fitbit

meteor add selaias:accounts-strava

meteor add selaias:accounts-mapmyfitness

meteor add selaias:accounts-underarmour

```

## Usage

In order to be able to use the API, you should initialize a fitness service by passing (at least) 
the ``access_token`` of an authenticated user (You can use the Authentication APIs to connect a user
and then read the ``access_token`` stored in Meteor.users collection)

````js

var token = Meteor.users.findOne({_id: userId}).services.runkeeper.access_token;

````

Now you are ready to initialize the Runkeeper API.

``server/main.js``
````js
const Runkeeper = FitAPI.runkeeper;

var options = {
  config: { 
    access_token: "XXXXXXXXXXX"
  }
};

Runkeeper.init(options);

````

Currenty the FitAPI is provided with a few basic endpoints for Runkeeper 
with their editable fields.

````js

var endPoints = {
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
  }
};

````

but you can extend those endpoints and pass it as options in the init function.

``server/main.js``
````js
const Runkeeper = FitAPI.runkeeper;

var options = {
  config: { 
    access_token: "XXXXXXXXXXX"
  },
  endPoints: {
  // ..... //
  }
};

Runkeeper.init(options);

````

Currently on the client only one agnostic method is provided ``FitAPIRequest`` and you can use it
for all API methods and extra endPoints you have set.

``client/runkeeper_user.js``

Simple user request [https://runkeeper.com/developer/healthgraph/example-api-calls#example-get-retrieving-user-info]
````js

var options = {
    service: "runkeeper",  // One Of ('runkeeper', 'strava', 'mapmyfitness', 'fitbit', 'underarmour')
    method: "GET",         // One Of ('GET', 'POST', 'PUT', 'DELETE')
    endPoint: "user"       // One of endpoints set on init
  }


  Meteor.call('FitAPIRequest', options, function(err, result){
    if(err) {
      console.log(err)
    } else {
      console.log(result)
    }
  });

````

or a request to update an Activity type

````js

var options = {
    service: "runkeeper",   // One Of ('runkeeper', 'strava', 'mapmyfitness', 'fitbit', 'underarmour')
    method: "PUT",         // One Of ('GET', 'POST', 'PUT', 'DELETE')
    endPoint: "fitnessActivities", // One of endpoints set on init
    params: {
      id: 'yourActivityId',
      data: {
        type: 'Running'
      }
    }
  }


  Meteor.call('FitAPIRequest', options, function(err, result){
    if(err) {
      console.log(err)
    } else {
      console.log(result)
    }
  });

````

## Wish List

Include more APIs, like Nike+, Polar etc, complete all endpoints for each service and more...

## Contribution

Ideas, Issues, PRs are more than welcome.

## Licence

MIT