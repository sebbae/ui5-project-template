sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press"
], function(Opa5, PropertyStrictEquals, Press) {
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
			
			}
		}
	});
});
