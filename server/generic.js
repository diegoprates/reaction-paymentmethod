/* eslint camelcase: 0 */

Meteor.methods({
  genericSubmit: function (transactionType, cardData, paymentData) {
    check(transactionType, String);
    check(cardData, {
      name: String,
      number: ValidCardNumber,
      expire_month: ValidExpireMonth,
      expire_year: ValidExpireYear,
      cvv2: ValidCVV,
      type: String
    });
    check(paymentData, {
      total: String,
      currency: String
    });

    // Place your call to your provider to authorize a transaction here
    let response = {}; // place the raw results in the response object

    let result = {
      saved: true,
      response: response
    };

    return result;
  },

  /**
   * Capture a Charge
   * @param  {Object} paymentMethod A PaymentMethod object
   * @return {Object} results normalized
   */
  "generic/payment/capture": function (paymentMethod) {
    check(paymentMethod, ReactionCore.Schemas.PaymentMethod);
    // Place your call to your provider to capture a payment here and place it in response
    let response = {};
    let result = {
      saved: true,
      response: response
    };
    return result;
  },
  "generic/refund/create": function(paymentMethod, amount) {
    check(paymentMethod, ReactionCore.Schemas.PaymentMethod);
    check(amount, Number);
    // Place your call to your respective provider for a refund here
    let response = {};

    let results = {
      saved: true,
      response: response
    };
    return results;
  },

  /**
   * List refunds
   * @param  {Object} paymentMethod object
   * @return {Object} result
   */
  "generic/refund/list": function (paymentMethod) {
    check(paymentMethod, ReactionCore.Schemas.PaymentMethod);

    let result = [];
    return result;
  }
});

ValidCardNumber = Match.Where(function (x) {
  return /^[0-9]{14,16}$/.test(x);
});

ValidExpireMonth = Match.Where(function (x) {
  return /^[0-9]{1,2}$/.test(x);
});

ValidExpireYear = Match.Where(function (x) {
  return /^[0-9]{4}$/.test(x);
});

ValidCVV = Match.Where(function (x) {
  return /^[0-9]{3,4}$/.test(x);
});
