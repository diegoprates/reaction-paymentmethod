
ReactionCore.Schemas.PaymentMethodPackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: false
    }
  }
]);

ReactionCore.Schemas.GenericPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name"
  },
  cardNumber: {
    type: String,
    min: 14,
    max: 16,
    label: "Card number"
  },
  expireMonth: {
    type: String,
    max: 2,
    label: "Expiration month"
  },
  expireYear: {
    type: String,
    max: 4,
    label: "Expiration year"
  },
  cvv: {
    type: String,
    max: 4,
    label: "CVV"
  }
});
