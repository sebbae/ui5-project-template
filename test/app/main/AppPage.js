sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/actions/Press"
], function(Opa5, PropertyStrictEquals, BindingPath, Press) {
	"use strict";

	Opa5.createPageObjects({
		onTheAppPage: {
			viewName: "my.app.main.App",
			actions: {
				iPressTheHomeButton: function() {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({
							name: "icon",
							value: "sap-icon://home"
						}),
						actions: new Press()
					});
				}
			},
			assertions: {
				iSeeAGreetingMessage: function(sGreeting) {
					return this.waitFor({
						controlType: "sap.m.Label",
						matchers: function(oLabel) {
							return oLabel.getBinding("text").getPath() === "greeting";
						},
						success: function(aLabels) {
							equals(aLabels.length, 1);
							var sText = aLabels[0].getText();
							equals(sText, sGreeting);
						},
						errorMessage: "Could not find greeting label"
					});
				}
			}
		}
	});
});
