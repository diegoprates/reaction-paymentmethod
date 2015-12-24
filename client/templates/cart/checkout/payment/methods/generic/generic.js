/* eslint camelcase: 0 */

uiEnd = function (template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
};

paymentAlert = function (errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
};

hidePaymentAlert = function () {
  return $(".alert").addClass("hidden").text("");
};

handleGenericSubmitError = function (error) {
  let serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error);
  }
};

let submitting = false;

AutoForm.addHooks("generic-payment-form", {
  onSubmit: function (doc) {
    submitting = true;
    let template = this.template;
    hidePaymentAlert();
    let form = {
      name: doc.payerName,
      number: doc.cardNumber,
      expire_month: doc.expireMonth,
      expire_year: doc.expireYear,
      cvv2: doc.cvv,
      type: getCardType(doc.cardNumber)
    };
    let storedCard = form.type.charAt(0).toUpperCase() + form.type.slice(1) + " " + doc.cardNumber.slice(-4);

    Meteor.GenericPayment.authorize(form, {
      total: ReactionCore.Collections.Cart.findOne().cartTotal(),
      currency: ReactionCore.Collections.Shops.findOne().currency
    }, function (error, transaction) {
      let paymentMethod;
      submitting = false;
      if (error) {
        handleGenericSubmitError(error);
        uiEnd(template, "Resubmit payment");
      } else {
        if (transaction.saved === true) {
          paymentMethod = {
            processor: "Generic",
            storedCard: storedCard,
            method: "Generic Payment",
            transactionId: transaction.transactionId,
            currency: transaction.currency,
            amount: transaction.response.amount,
            status: "new",
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          paymentMethod.transactions.push(transaction.response);
          Meteor.call("cart/submitPayment", paymentMethod);
        } else {
          handleGenericSubmitError(transaction.error);
          uiEnd(template, "Resubmit payment");
        }
      }
    });
    return false;
  },
  beginSubmit: function () {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit: function () {
    if (!submitting) {
      return uiEnd(this.template, "Complete your order");
    }
  }
});
