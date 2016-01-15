// You should not implement this object. It is supposed to represent your third part API
// And is called so that it can be stubbed out for testing. This would be a library
// like Stripe or Authorize.net usually just included with a NPM.require

ThirdPartyAPI = {
  authorize: function (transactionType, cardData, paymentData) {
    if (transactionType === "authorize") {
      let results = {
        success: true,
        id: Random.id(),
        cardNumber: cardData.number.slice(-4),
        amount: paymentData.total
      };
      return results;
    }
    return {
      success: false
    };
  },
  capture: function (authorizationId) {
    return {
      authorizationId: authorizationId
    };
  },
  refund: function (transactionId, amount) {
    return {
      transactionId: transactionId,
      amount: amount
    };
  },
  listRefunds: function (transactionId) {
    return {
      transactionId: transactionId,
      refunds: []
    };
  }
};

// This is the "wrapper" functions you should write in order to make your code more
// testable. You can either mirror the API calls or normalize them to the authorize/capture/refund/refunds
// that Reaction is expecting
GenericAPI = {};
GenericAPI.methods = {};

GenericAPI.methods.authorize = {
  name: "GenericAPI.methods.authorize",
  validate(args) {
    check(args,
      {
        paymentType: {type: String, label: "paymentType", allowedValues: ["authorize", "capture"]},
        cardData: {type: Object, label: "cardData", blackbox: true},
        paymentData: {type: Object, label: "paymentType", blackbox: true}
      });
  },
  run({ transactionType, cardData, paymentData }) {
    let results = ThirdPartyAPI.authorize(transactionType, cardData, paymentData);
    return results;
  },
  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    };

    Meteor.apply(this.name, [args], options, callback);
  }
};

Meteor.methods({
  [GenericAPI.methods.authorize.name]: function (args) {
    GenericAPI.methods.authorize.validate.call(this, args);
    let results = GenericAPI.methods.authorize.run.call(this, args);
    return results;
  }
});
