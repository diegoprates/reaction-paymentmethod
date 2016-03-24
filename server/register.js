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
      label: "Example Payment Provider",
      description: "Example payment provider",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod",
      template: "generic",
      permissions: [{
        label: "Example Payment Provider",
        permission: "dashboard/generic"
      }]
    },

    // Settings panel
    {
      label: "Example Payment Settings",
      route: "/dashboard/generic/settings",
      provides: "settings",
      container: "dashboard",
      template: "genericSettings"
    },

    // Payment form for checkout
    {
      template: "genericPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
