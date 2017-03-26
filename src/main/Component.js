sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox"
], function(UIComponent, MessageBox) {
	"use strict";

	var AppComponent = UIComponent.extend("my.app.main.Component", {
		metadata: {
			manifest: "json"
		}
	});

	AppComponent.prototype.init = function () {
		UIComponent.prototype.init.apply(this, arguments);
		this.getRouter().initialize();
		this._initErrorHandling();
	};

	AppComponent.prototype.exit = function() {
		this._exitErrorHandling();
	};

	AppComponent.prototype.enableErrorBus = function() {
		this.bErrorBusDisabled = false;
	};

	AppComponent.prototype.disableErrorBus = function() {
		this.bErrorBusDisabled = true;
	};

	AppComponent.prototype._onError = function(sChannel, sEvent, oData) {
		if (!this.bErrorBusDisabled && !oData.handledByMessageParser) {
			this._showError(oData);
		}
	};

	AppComponent.prototype._onWarning = function(sChannel, sEvent, oData) {
		var oModel = this.getModel("i18n");
		var oErrorInfo = oData; // actually process payload
		var sMessage = oErrorInfo.message || oModel.getProperty("UNKNOWN_ERROR_OCCURRED");
		jQuery.sap.log.warning(sMessage);
		jQuery.sap.log.warning(JSON.stringify(oErrorInfo));
	};

	AppComponent.prototype._showError = function(oData, i18n) {
		if (this.bErrorBusDisabled) {
			return;
		}
		var oModel = this.getModel("i18n");
		var oErrorInfo = oData; // actually process payload
		var sMessage = oErrorInfo.message || oModel.getProperty("UNKNOWN_ERROR_OCCURRED");
		var sTitle = oErrorInfo.title || oModel.getProperty("APPLICATION_ERROR");

		MessageBox.error(sMessage, {
			title: sTitle
		});
	};

	AppComponent.prototype._catchError = function(sMessage, sURL, iLine, iColumn, oError) {
		if (!this.bErrorBusDisabled) {
			sap.ui.getCore().getEventBus().publish("ProSports", "Error", {
				titleKey: "APPLICATION_ERROR",
				message: sMessage,
				stack: oError && oError.stack
			});
		}
	};

	AppComponent.prototype._initErrorHandling = function() {
		sap.ui.getCore().getEventBus().subscribe("ProSports", "Error", this._onError, this);
		sap.ui.getCore().getEventBus().subscribe("ProSports", "Warning", this._onWarning, this);

		// route uncaught errors to error bus
		window.onerror = this._catchError;
	};

	AppComponent.prototype._exitErrorHandling = function() {
		sap.ui.getCore().getEventBus().unsubscribe("ProSports", "Error", this._onError, this);
		sap.ui.getCore().getEventBus().unsubscribe("ProSports", "Warning", this._onWarning, this);

		if (window.onerror === this._catchError) {
			window.onerror = null;
		}
	};

	return AppComponent;
});
