sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
	return UIComponent.extend("breeze.Component", {
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
		},
		destroy: function() {
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
});
