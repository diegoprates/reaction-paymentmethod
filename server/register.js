/* eslint camelcase: 0 */

ReactionCore.registerPackage({
  label: "GenericPayment",
  name: "reaction-paymentmethod",
  icon: "fa fa-cc-generic",
  autoEnable: true,
  settings: {
    mode: false,
    apiKey: ""
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "Generic Payment",
      description: "Generic Payment Method",
      route: "dashboard/generic",
      icon: "fa fa-cc-generic",
      cycle: "3",
      container: "dashboard"
    },

    // Settings panel
    {
      label: "Generic Payment Settings",
      route: "dashboard/generic",
      provides: "settings",
      container: "dashboard",
      template: "genericSettings"
    },

    // Payment form for checkout
    {
      template: "genericPaymentForm",
      provides: "paymentMethod"
    }
  ],
  permissions: [{
    label: "Generic Payment Method",
    permission: "dashboard/payments",
    group: "Shop Settings"
  }]
});
