sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	var AppController = Controller.extend("my.app.main.App");

	AppController.prototype.onInit = function(oParameters) {
		this.getView().setModel(new JSONModel({
			greeting: "Hi!"
		}));
		this.getView().bindElement("/");
	};

	AppController.prototype.handleNavigate = function(oEvent) {
		var sRoute = oEvent.getSource().data("route") || "home";
		sap.ui.core.UIComponent.getRouterFor(this).navTo(sRoute, {});
	};

	AppController.prototype.handleX = (oEvent) => { console.log("hello world"); };
	return AppController;
});
