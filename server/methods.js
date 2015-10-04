Meteor.methods({
  FitAPIRequest( options ) {
    check( options, Object);
    try {
      return FitAPI.common.request( options );
    } catch ( e ) {
      console.log(e)
      throw new Meteor.Error( e.error, e.reason );
    }
  },
});