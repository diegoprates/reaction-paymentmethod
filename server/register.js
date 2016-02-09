/* eslint camelcase: 0 */

ReactionCore.registerPackage({
  label: "GenericPayment",
  name: "reaction-paymentmethod",
  icon: "fa fa-credit-card-alt",
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
      description: "Generic payment method",
      route: "dashboard/generic",
      icon: "fa fa-credit-card-alt",
      cycle: "3",
      container: "dashboard",
      template: "generic"
    },

    // Settings panel
    {
      label: "Generic Payment Settings",
      route: "dashboard/generic/settings",
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
    permission: "dashboard/generic",
    group: "Shop Settings"
  }]
});
