describe("Submit payment", function () {
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

  it("should throw an error if card data is not correct", function (done) {
    let badCardData = {
      name: "Test User",
      cvv2: "123",
      type: "visa"
    };

    let paymentData = {
      currency: "USD",
      total: "19.99"
    };

    // Notice how you need to wrap this call in another function
    expect(function () {
      Meteor.call("genericSubmit", "authorize", badCardData, paymentData);
    }
    ).toThrow();
    done();
  });
});

describe("Capture payment", function () {
  it("should call GenericAPI with transaction ID", function (done) {
    let captureResults = { success: true };
    let transactionId = "abc1234";
    spyOn(GenericAPI.methods, "capture").and.returnValue(captureResults);
    Meteor.call("generic/payment/capture", transactionId);
    expect(GenericAPI.methods.capture).toHaveBeenCalledWith(transactionId);
    done();
  });

  it("should throw an error if transaction ID is not found", function (done) {
    spyOn(GenericAPI.methods, "capture").and.callFake(function () {
      throw new Meteor.Error("Not Found");
    });

    expect(function () {
      Meteor.call("generic/payment/capture", "abc123");
    }).toThrow();
    done();
  });
});

describe("Refund", function () {
  it("should call GenericAPI with transaction ID", function (done) {
    let refundResults = { success: true };
    let transactionId = "abc1234";
    let amount = 19.99;
    spyOn(GenericAPI.methods, "refund").and.returnValue(refundResults);
    Meteor.call("generic/refund/create", transactionId, amount);
    expect(GenericAPI.methods.refund).toHaveBeenCalledWith(transactionId, amount);
    done();
  });

  it("should throw an error if transaction ID is not found", function (done) {
    spyOn(GenericAPI.methods, "refund").and.callFake(function () {
      throw new Meteor.Error("404", "Not Found");
    });

    expect(function () {
      Meteor.call("generic/refund/create", "abc123", 19.99);
    }).toThrow(new Meteor.Error("404", "Not Found"));
    done();
  });
});

describe("List Refunds", function () {
  it("should call GenericAPI with transaction ID", function (done) {
    let refundResults = { success: true };
    let transactionId = "abc1234";
    spyOn(GenericAPI.methods, "refunds").and.returnValue(refundResults);
    Meteor.call("generic/refund/list", transactionId);
    expect(GenericAPI.methods.refunds).toHaveBeenCalledWith(transactionId);
    done();
  });

  it("should throw an error if transaction ID is not found", function (done) {
    spyOn(GenericAPI.methods, "refunds").and.callFake(function () {
      throw new Meteor.Error("404", "Not Found");
    });

    expect(function () {
      Meteor.call("generic/refund/list", "abc123", 19.99);
    }).toThrow(new Meteor.Error("404", "Not Found"));
    done();
  });
});

