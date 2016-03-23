
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
  capture: function (authorizationId, amount) {
    return {
      authorizationId: authorizationId,
      amount: amount,
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
          type: "refund",
          amount: 3.99,
          created: 1454034562000,
          currency: "usd",
          raw: {}
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

cardSchema = new SimpleSchema({
  number: { type: String },
  name: { type: String },
  cvv2: { type: String },
  expireMonth: { type: String },
  expireYear: { type: String },
  type: { type: String }
});

paymentDataSchema = new SimpleSchema({
  total: { type: String },
  currency: { type: String }
});


GenericAPI.methods.authorize = new ValidatedMethod({
  name: "GenericAPI.methods.authorize",
  validate: new SimpleSchema({
    transactionType: { type: String },
    cardData: { type: cardSchema },
    paymentData: { type: paymentDataSchema }
  }).validator(),
  run({ transactionType, cardData, paymentData }) {
    let results = ThirdPartyAPI.authorize(transactionType, cardData, paymentData);
    return results;
  }
});


GenericAPI.methods.capture = {
  name: "GenericAPI.methods.capture",
  validate(args) {
    check(args, {
      authorizationId: String,
      amount: Number
    });
  },
  run(args) {
    let transactionId = args.authorizationId;
    let amount = args.amount;
    let results = ThirdPartyAPI.capture(transactionId, amount);
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
    check(args, {
      transactionId: String,
      amount: Number
    });
  },
  run(args) {
    let transactionId = args.transactionId;
    let amount = args.amount;
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
    let results = GenericAPI.methods.refund.run.call(this, args);
    return results;
  }
});


GenericAPI.methods.refunds = {
  name: "GenericAPI.methods.refunds",
  validate(args) {
    check(args, {
      transactionId: String
    });
  },
  run(args) {
    let { transactionId } = args;
    let results = ThirdPartyAPI.listRefunds(transactionId);
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
