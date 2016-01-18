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
  },

  refunds: (transactionId, callback) => {
    Meteor.call("generic/refunds/list", transactionId, callback);
  },

  config: function (options) {
    this.accountOptions = options;
  },

  chargeObj: function () {
    return {
      amount: "",
      currency: "",
      card: {},
      capture: true
    };
  },

  parseCardData: function (data) {
    return {
      number: data.number,
      name: data.name,
      cvc: data.cvv2,
      expireMonth: data.expire_month,
      expireYear: data.expire_year
    };
  }
};
