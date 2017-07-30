sap.ui.define([
	"breeze/controller/BaseController",
	"breeze/models/Models",
	"sap/ui/model/json/JSONModel",
], function(BaseController, Models, JSONModel) {
	"use strict";

	return BaseController.extend("breeze.controller.Main", {
			onInit: function() {
				Models.loadACDevicesModel();
			}
	});
});
