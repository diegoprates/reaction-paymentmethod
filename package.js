Package.describe({
  summary: "Reaction Example Payment Provider - An example 'no-process' payment method",
  name: "reactioncommerce:reaction-paymentmethod",
  version: "0.0.5",
  git: "https://github.com/reactioncommerce/reaction-paymentmethod.git"
});

Npm.depends({
  "@sanjo/jasmine-spy": "1.0.1",
  "@sanjo/jasmine-expect": "1.0.0"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3");

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

  api.use("reactioncommerce:core@0.13.0");

  api.addFiles(["server/register.js", "server/generic.js", "server/genericapi.js"], ["server"]); // register as a reaction package

  api.addFiles([
    "common/collections.js",
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

  api.use("accounts-base@1.2.5", {weak: true});
  api.use("accounts-password@1.1.7", {weak: true});

  // reaction core
  api.use("reactioncommerce:reaction-collections");
  api.use("reactioncommerce:reaction-factories");
  api.use("reactioncommerce:core");
  api.use("reactioncommerce:reaction-paymentmethod");

  // server integration tests
  api.addFiles("server/methods.app-test.js", "server");
  api.export("faker", ["server"]);
});
