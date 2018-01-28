sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	var AppController = Controller.extend("my.app.main.App");

	AppController.prototype.onInit = function(oParameters) {
	};

	AppController.prototype.handleNavigate = function(oEvent) {
		var sRoute = oEvent.getSource().data("route") || "home";
		sap.ui.core.UIComponent.getRouterFor(this).navTo(sRoute, {});
	};

	AppController.prototype.handleX = (oEvent) => { console.log("hello world"); };
	return AppController;
});
