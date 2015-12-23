Package.describe({
  summary: "Reaction Payment Method - A generic 'no-process' payment method for you to fork and make your own",
  name: "reactioncommerce:reaction-paymentmethod",
  version: "0.0.1",
  git: "https://github.com/zenweasel/reaction-paymentmethod.git"
});


Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2");

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


  api.use("reactioncommerce:core@0.10.1");

  api.addFiles("server/register.js", ["server"]); // register as a reaction package

  api.addFiles([
    "common/collections.js",
    "common/routing.js",
    "lib/generic.js"
  ], ["client", "server"]);

  api.addFiles([
    "client/templates/generic.html",
    "client/templates/generic.js",
    "client/templates/cart/checkout/payment/methods/generic/generic.html",
    "client/templates/cart/checkout/payment/methods/generic/generic.less",
    "client/templates/cart/checkout/payment/methods/generic/generic.js"
  ], ["client"]);
});
