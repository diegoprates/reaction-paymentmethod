describe("Authorize payment", function () {
  it("should call Generic API with card and payment data", function (done) {
    let cardData = {
      name: "Test User",
      number: "4242424242424242",
      expireMonth: "2",
      expireYear: "2018",
      cvv2: "123",
      type: "visa"
    };
    let paymentData = {
      currency: "USD",
      total: "19.99"
    };

    let authorizeResult = {
      saved: true,
      currency: "USD"
    };

    spyOn(GenericAPI.methods, "authorize").and.returnValue(authorizeResult);
    Meteor.call("genericSubmit", "authorize", cardData, paymentData);
    expect(GenericAPI.methods.authorize).toHaveBeenCalledWith({
      transactionType: "authorize",
      cardData: cardData,
      paymentData: paymentData
    });
    done();
  });
});
