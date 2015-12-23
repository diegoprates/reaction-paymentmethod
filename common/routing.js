Router.map(function () {
  return this.route("dashboard/generic", {
    controller: ShopAdminController,
    path: "dashboard/generic",
    template: "generic",
    waitOn: function () {
      return ReactionCore.Subscriptions.Packages;
    }
  });
});
