sap.ui.define([
	"breeze/controller/BaseController",
	"breeze/models/Models",
	"sap/ui/model/json/JSONModel",
], function(BaseController, Models, JSONModel) {
	"use strict";

	return BaseController.extend("breeze.controller.Main", {
		oACDevicesModel: new JSONModel(),
		onInit: function() {
			Models.loadACDevicesModel(this);
		},
		onACDevicesModelLoaded: function() {
			this.getView().setModel(this.oACDevicesModel, "ACDevicesModel");
		}
	});
});
