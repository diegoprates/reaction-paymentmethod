/* eslint no-unused-vars: 0 */

Template.genericSettings.helpers({
  packageData: function () {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-paymentmethod"
    });
  }
});

Template.generic.helpers({
  packageData: function () {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-paymentmethod"
    });
  }
});

Template.generic.events({
  "click [data-event-action=showGenericSettings]": function () {
    ReactionCore.showActionView();
  }
});

AutoForm.hooks({
  "generic-update-form": {
    onSuccess: function (operation, result, template) {
      Alerts.removeSeen();
      return Alerts.add("Generic Payment Method settings saved.", "success");
    },
    onError: function (operation, error, template) {
      Alerts.removeSeen();
      return Alerts.add("Generic Payment Method settings update failed. " + error, "danger");
    }
  }
});
