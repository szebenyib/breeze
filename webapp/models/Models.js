sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function(JSONModel, Device) {
	"use strict";
	return {
		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		loadACDevicesModel: function(oDelegate) {
			oModel.attachRequestCompleted(function() {
				oDelegate.onACDevicesModelLoaded();
			});
			oModel.loadData("config/ACDevices.json");
		}
	};
});
