describe("Authorize payment", function () {
  it("should call Generic API with card data", function (done) {
    let cardData = {
      name: "Brent Hoover",
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
    spyOn(GenericAPI, "authorize").and.returnValue(authorizeResult);
    Meteor.call("genericSubmit", "authorize", cardData, paymentData);
    expect(GenericAPI.authorize).toHaveBeenCalledWith("authorize", cardData);
    done();
  });
});
