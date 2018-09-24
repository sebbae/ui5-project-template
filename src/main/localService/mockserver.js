sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    "use strict";

	return {
		init: function() {
		    MockServer.config({
				autoRespond: true,
				autoRespondAfter: 200
		    });
			
			var sPath = jQuery.sap.getModulePath("my.app.main.localService");

		    var oMockServer = new MockServer({
				rootUri: "/odata/"
			});
			oMockServer.simulate(sPath + "/metadata.xml", { 
				sMockdataBaseUrl: sPath + "/data",
				bGenerateMissingMockData: true
			});
			oMockServer.start();
		}
	};
});
