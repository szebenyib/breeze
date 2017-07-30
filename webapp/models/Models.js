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
			oDelegate.oACDevicesModel.attachRequestCompleted(function() {
				oDelegate.onACDevicesModelLoaded();
			});
			oDelegate.oACDevicesModel.loadData("config/ACDevices.json");
		}
	};
});
