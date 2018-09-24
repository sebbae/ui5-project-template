sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/opaQunit",
	"sap/ui/core/util/MockServer"
], function(Opa5, opaQunit, MockServer) {
	"use strict";

	Opa5.extendConfig({
		autoWait: true
	});

	QUnit.module("Main component", {
		afterEach: function() {
			MockServer.stopAll();
			new Opa5().iTeardownMyUIComponent();
		}
	});

	opaTest("Show main component", function(Given, When, Then) {
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "my.app.main"
			}
		});
		When.onTheAppPage.iPressTheHomeButton();
		Then.onTheAppPage.iSeeAGreetingMessage("Hi!");

		ok(true);
	});

	opaTest("Show main component2", function(Given, When, Then) {
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "my.app.main"
			}
		});

		ok(true);
	});
});
