Meteor.methods({
  /**
   * Submit a card for Authorization
   * @param  {Object} transactionType authorize or capture
   * @param  {Object} cardData card Details
   * @param  {Object} paymentData The details of the Payment Needed
   * @return {Object} results normalized
   */
  "genericSubmit": function (transactionType, cardData, paymentData) {
    check(transactionType, String);
    check(cardData, {
      name: String,
      number: ValidCardNumber,
      expireMonth: ValidExpireMonth,
      expireYear: ValidExpireYear,
      cvv2: ValidCVV,
      type: String
    });

    check(paymentData, {
      total: String,
      currency: String
    });
    let total = parseFloat(paymentData.total);
    let result;
    try {
      let transaction = GenericAPI.methods.authorize.call({
        transactionType: transactionType,
        cardData: cardData,
        paymentData: paymentData
      });

      result = {
        saved: true,
        status: "created",
        currency: paymentData.currency,
        amount: total,
        transactionId: transaction.id,
        response: {
          amount: total,
          transactionId: transaction.id,
          currency: paymentData.currency
        }
      };
    } catch (error) {
      ReactionCore.Log.warn(error);
      result = {
        saved: false,
        error: error
      };
    }
    return result;
  },

  /**
   * Capture a Charge
   * @param {Object} paymentData Object containing data about the transaction to capture
   * @return {Object} results normalized
   */
  "generic/payment/capture": function (paymentData) {
    check(paymentData, Object);
    let authorizationId = paymentData.transactionId;
    let amount = paymentData.amount;
    let response = GenericAPI.methods.capture.call(authorizationId, amount);
    let result = {
      saved: true,
      response: response
    };
    console.log("server/generic results: " + result);
    return result;
  },

  /**
   * Create a refund
   * @param  {Object} transactionId object
   * @param  {Number} amount The amount to be refunded
   * @return {Object} result
   */
  "generic/refund/create": function (transactionId, amount) {
    check(transactionId, String);
    check(amount, Number);
    let response = GenericAPI.methods.refund(transactionId, amount);
    let results = {
      saved: true,
      response: response
    };
    return results;
  },

  /**
   * List refunds
   * @param  {String} transactionId object
   * @return {Object} result
   */
  "generic/refund/list": function (transactionId) {
    check(transactionId, String);
    let response = GenericAPI.methods.refunds(transactionId);
    let result = {
      success: true,
      response: response
    };
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

