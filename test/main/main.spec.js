sap.ui.define([
	"jquery.sap.global",
	"sap/ui/test/Opa5",
	"sap/ui/test/opaQunit",
	"sap/ui/core/util/MockServer",
], function(jQuery, Opa5, opaQunit, MockServer) {

	var oArrangements = new Opa5({
	    iStartMyApp : function () {
	        return this.iStartMyAppInAFrame("../index.html");
	    }
	});

	QUnit.module("Main component", {
		beforeEach: function() {
			Opa5.extendConfig({
				arrangements: oArrangements,
				viewNamespace: "my.app.main."
			});
		},
		afterEach: function() {
			MockServer.stopAll();
		}
	});

	opaTest("Show main component", function(Given, When, Then) {
		ok(true);
//		initDataproviderComponent(Given);
//		Then.onTheDataproviderPage.iShouldSeeTheDataproviderList();
	});
});
