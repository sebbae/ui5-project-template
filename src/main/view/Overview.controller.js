sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	var OverviewController = Controller.extend("my.app.main.view.Overview");

	OverviewController.prototype.onInit = function(oParameters) {
		this.getView().setModel(new JSONModel(), "sample");
		this.getView().getModel("sample").loadData(jQuery.sap.getModulePath("my.app.main.view") + "/../data/sample.json");
	};

	return OverviewController;
});
