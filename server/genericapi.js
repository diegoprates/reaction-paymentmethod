
// You should not implement ThirdPartyAPI. It is supposed to represent your third party API
// And is called so that it can be stubbed out for testing. This would be a library
// like Stripe or Authorize.net usually just included with a NPM.require
ThirdPartyAPI = {
  authorize: function (transactionType, cardData, paymentData) {
    if (transactionType === "authorize") {
      let results = {
        success: true,
        id: Random.id(),
        cardNumber: cardData.number.slice(-4),
        amount: paymentData.total,
        currency: "USD"
      };
      return results;
    }
    return {
      success: false
    };
  },
  capture: function (authorizationId) {
    return {
      authorizationId: authorizationId,
      success: true
    };
  },
  refund: function (transactionId, amount) {
    return {
      sucess: true,
      transactionId: transactionId,
      amount: amount
    };
  },
  listRefunds: function (transactionId) {
    return {
      transactionId: transactionId,
      refunds: [
        {
          date: "2015-10-16T22:19:51.993Z",
          amount: 19.99,
          comment: "Cancel Backorder"
        },
        {
          date: "2015-10-16T22:19:51.993Z",
          amount: 3.99,
          comment: "Refund Shipping"
        }

      ]
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
    check(args, Object);
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
    let results = Meteor.apply(this.name, [args], options, callback);
    return results;
  }
};


Meteor.methods({
  [GenericAPI.methods.authorize.name]: function (args) {
    GenericAPI.methods.authorize.validate.call(this, args);
    let results = GenericAPI.methods.authorize.run.call(this, args);
    return results;
  }
});

GenericAPI.methods.capture = {
  name: "GenericAPI.methods.capture",
  validate(args) {
    check(args,
      {
        transactionId: {type: String, label: "transactionID"}
      });
  },
  run({ transactionId }) {
    let results = ThirdPartyAPI.capture(transactionId);
    return results;
  },
  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    };
    let results = Meteor.apply(this.name, [args], options, callback);
    return results;
  }
};

Meteor.methods({
  [GenericAPI.methods.capture.name]: function (args) {
    GenericAPI.methods.capture.validate.call(this, args);
    let results = GenericAPI.methods.capture.run.call(this, args);
    return results;
  }
});

GenericAPI.methods.refund = {
  name: "GenericAPI.methods.refund",
  validate(args) {
    check(args,
      {
        transactionId: {type: String, label: "transactionID"},
        amount: { type: Number }
      });
  },
  run({ transactionId, amount }) {
    let results = ThirdPartyAPI.refund(transactionId, amount);
    return results;
  },
  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    };
    let results = Meteor.apply(this.name, [args], options, callback);
    return results;
  }
};

Meteor.methods({
  [GenericAPI.methods.refund.name]: function (args) {
    GenericAPI.methods.refund.validate.call(this, args);
    return GenericAPI.methods.refund.run.call(this, args);
  }
});

GenericAPI.methods.refunds = {
  name: "GenericAPI.methods.refunds",
  validate(args) {
    check(args,
      {
        transactionId: {type: String, label: "transactionID"}
      });
  },
  run({ transactionId }) {
    let results = ThirdPartyAPI.refunds(transactionId);
    return results;
  },
  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    };
    let results = Meteor.apply(this.name, [args], options, callback);
    return results;
  }
};


Meteor.methods({
  [GenericAPI.methods.refunds.name]: function (args) {
    GenericAPI.methods.refunds.validate.call(this, args);
    let results = GenericAPI.methods.refunds.run.call(this, args);
    return results;
  }
});

