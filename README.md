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
the ``access_token`` (via the authentication APIs)

````js
const Runkeeper = FitAPI.runkeeper;

var options = {
  config: { 
    access_token: "XXXXXXXXXXX
  }
};

Runkeeper.init(options);

````

Currenty the API is provided with a few basic end points for Runkeeper

````js

var endPoints = {
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
};

````

but you can extend those end points and pass it as options in the init function.

## Wish List

Include more APIs, like Nike+, Polar etc.

## Contribution

Ideas, Issues, PRs are more than welcome.

## Licence

MIT