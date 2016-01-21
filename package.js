Package.describe({
  summary: "Reaction Payment Method - A generic 'no-process' payment method for you to fork and make your own",
  name: "reactioncommerce:reaction-paymentmethod",
  version: "0.0.2",
  git: "https://github.com/reactioncommerce/reaction-paymentmethod.git"
});


Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2.1");

  // meteor base packages
  api.use("meteor-base");
  api.use("mongo");
  api.use("ecmascript");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");
  api.use("logging");
  api.use("reload");
  api.use("random");
  api.use("ejson");
  api.use("spacebars");
  api.use("check");

  api.use("reactioncommerce:core@0.11.0");

  api.addFiles(["server/register.js", "server/generic.js", "server/genericapi.js"], ["server"]); // register as a reaction package

  api.addFiles([
    "common/collections.js",
    "common/routing.js",
    "lib/generic.js"
  ], ["client", "server"]);

  api.addFiles([
    "client/templates/settings/generic.html",
    "client/templates/settings/generic.js",
    "client/templates/cart/checkout/payment/methods/generic/generic.html",
    "client/templates/cart/checkout/payment/methods/generic/generic.less",
    "client/templates/cart/checkout/payment/methods/generic/generic.js"
  ], ["client"]);

  api.export("GenericAPI", "server");
});

Package.onTest(function (api) {
  api.use("underscore");
  api.use("random");
  api.use("sanjo:jasmine@0.20.3");
  api.use("velocity:html-reporter@0.9.1");
  api.use("velocity:console-reporter@0.1.4");

  api.use("accounts-base");
  api.use("accounts-password");

  // reaction core
  api.use("reactioncommerce:reaction-collections@1.0.4");
  api.use("reactioncommerce:reaction-factories@0.3.2");
  api.use("reactioncommerce:core@0.11.0");
  api.use("reactioncommerce:reaction-paymentmethod@0.0.1");

  // server integration tests
  api.addFiles("tests/jasmine/server/integration/methods.js", "server");
  api.export("faker", ["server"]);
});
