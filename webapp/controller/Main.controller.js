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
			var oDeviceList = this.byId("deviceList");
			if (oDeviceList.getItems()) {
				oDeviceList.setSelectedItemById(
					oDeviceList.getItems()[0].sId);
				oDeviceList.fireSelectionChange();
			}
		},
		onSelectionChange: function(oEvent) {
			var sDevId = oEvent.getSource().getSelectedItem().getValue();
			this.setSelDevModelFromACDevicesModelByDevId(sDevId);
			this.byId("splitContainer")
				.toDetail(this.createId("detailPage"));
		},
		/**
		 * Setting the SelDevModel to the ACDevices model's given
		 * device that is currently selected. It's new and last commands
		 * are deep copied making the SelDevModel independent
		 * from the ACDevices model regarding new and last commands.
		 * Those two models are only updated once a
		 * new command is sent. A simple selection of another device leads
		 * to a reset in "new" command.
		 */
		setSelDevModelFromACDevicesModelByDevId: function(sDevId) {
			var oDevices = this.getModel("ACDevicesModel").getProperty("/");
			for (var i = 0; i < oDevices.length; i++) {
				if (oDevices[i].id === sDevId) {
					if (!oDevices[i].lastCommand) {
						oDevices[i]["newCommand"] = jQuery.extend(
							true, {}, oDevices[i]["default"]);
						oDevices[i]["lastCommand"] = jQuery.extend(
							true, {}, oDevices[i]["default"]);
					} else {
						oDevices[i]["newCommand"] = jQuery.extend(
							true, {}, oDevices[i]["lastCommand"]);
					}
					var oSelDevModel = new JSONModel(oDevices[i]);
					this.setModel(oSelDevModel, "SelDevModel");
				}
			}
		},
		updateACDevicesModelFromSelDevModel: function() {
			var oSelDevModel = this.getModel("SelDevModel");
			var oACDevicesModel = this.getModel("ACDevicesModel");
			var sDevId = this.byId("deviceList").getSelectedItem().getValue();
			var oDevices = oACDevicesModel.getProperty("/");
			for (var i = 0; i < oDevices.length; i++) {
				if (oDevices[i].id === sDevId) {
					oACDevicesModel.setProperty(
						"/" + sDevId + "/lastCommand",
						jQuery.extend(true, {}, oSelDevModel
						.getProperty("/lastCommand")));
				}
			}
		},
		copyNewCommandToLastInSelDevModel: function() {
			var oSelDevModel = this.getModel("SelDevModel");
			oSelDevModel.setProperty("/lastCommand",
				jQuery.extend(true, {}, oSelDevModel
					.getProperty("/newCommand")));
		},
		onNavButtonPressed: function() {
			this.byId("splitContainer")
				.toMaster(this.createId("masterPage"));
		},
		onTurnOnAndSendButtonPressed: function() {
			this.getModel("SelDevModel").setProperty("/newCommand/on", true);
			this.copyNewCommandToLastInSelDevModel();
			this.updateACDevicesModelFromSelDevModel();
		},
		onTurnOffButtonPressed: function() {
			this.getModel("SelDevModel").setProperty("/newCommand/on", false);
			this.copyNewCommandToLastInSelDevModel();
			this.updateACDevicesModelFromSelDevModel();
		}
	});
});
