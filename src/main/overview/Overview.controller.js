sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	var OverviewController = Controller.extend("my.app.main.overview.Overview");

	OverviewController.prototype.onInit = function(oParameters) {
		this.getView().setModel(new JSONModel(), "sample");
		this.getView().getModel("sample").loadData(jQuery.sap.getModulePath("my.app.main.overview") + "/../data/sample.json");
	};

	return OverviewController;
});
