sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device"
], (Controller, Device) => {
    "use strict";

    return Controller.extend("com.mycompany.fioriapp.controller.App", {
        onInit() {
            this.getView().addStyleClass(Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
        }
    });
});
