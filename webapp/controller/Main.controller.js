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
			this.byId("masterPage").setShowHeader(!this.isDevicePhone());
			this.byId("detailPage").setShowHeader(!this.isDevicePhone());
			this.byId("detailPage").setShowNavButton(this.isDevicePhone());
		},
		onACDevicesModelLoaded: function() {
			this.setModel(this.oACDevicesModel, "ACDevicesModel");
		},
		onDevicePressed: function(oEvent) {
			var sDevId = oEvent.getSource().getValue();
			this.setDevModelByDevId(sDevId);
			this.byId("splitContainer")
				.toDetail(this.createId("detailPage"));
		},
		setDevModelByDevId: function(sDevId) {
			var oDevices = this.getModel("ACDevicesModel").getProperty("/");
			for (var i = 0; i < oDevices.length; i++) {
				if (oDevices[i].id === sDevId) {
					var oSelDevModel = new JSONModel(oDevices[i]);
					this.setModel(oSelDevModel, "SelDevModel");
				}
			}
		},
		onNavButtonPressed: function() {
			this.byId("splitContainer")
				.toMaster(this.createId("masterPage"));
		}
	});
});
