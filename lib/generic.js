Meteor.GenericPayment = {
  accountOptions: function () {
    const settings = ReactionCore.Collections.Packages.findOne({
      name: "reaction-paymentmethod"
    }).settings;
    if (!settings.api_key) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return settings.api_key;
  },

  authorize: function (cardInfo, paymentInfo, callback) {
    Meteor.call("genericSubmit", "authorize", cardInfo, paymentInfo,
      callback);
  },

  capture: function (transactionId, amount, callback) {
    let captureDetails = {
      amount: amount
    };
    Meteor.call("generic/payment/capture", transactionId, captureDetails, callback);
  },

  refund: function (transactionId, amount, callback) {
    let refundDetails = {
      charge: transactionId,
      amount: amount,
      reason: "requestedByCustomer"
    };
    Meteor.call("generic/refund/create", refundDetails, callback);
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
      exp_month: data.expire_month,
      exp_year: data.expire_year
    };
  }
};
