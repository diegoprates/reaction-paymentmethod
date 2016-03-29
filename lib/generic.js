Meteor.GenericPayment = {
  accountOptions: function () {
    const settings = ReactionCore.Collections.Packages.findOne({
      name: "reaction-paymentmethod"
    }).settings;
    if (!settings.apiKey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return settings.apiKey;
  },

  authorize: function (cardInfo, paymentInfo, callback) {
    Meteor.call("genericSubmit", "authorize", cardInfo, paymentInfo, callback);
  }
};
