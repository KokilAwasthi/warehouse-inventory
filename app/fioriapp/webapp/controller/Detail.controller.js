sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "com/mycompany/fioriapp/model/formatter"
], (Controller, History, formatter) => {
    "use strict";

    return Controller.extend("com.mycompany.fioriapp.controller.Detail", {
        formatter,

        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute("detail")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(event) {
            const productId = event.getParameter("arguments").productId;
            // OData V4 key predicate; single quotes in string keys are escaped by doubling
            const key = encodeURIComponent(productId.replace(/'/g, "''"));
            this.getView().bindElement("/Products('" + key + "')");
        },

        onNavBack() {
            if (History.getInstance().getPreviousHash() !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("main", {}, true);
            }
        }
    });
});
