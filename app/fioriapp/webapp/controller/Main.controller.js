sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "com/mycompany/fioriapp/model/formatter"
], (Controller, Filter, FilterOperator, JSONModel, formatter) => {
    "use strict";

    return Controller.extend("com.mycompany.fioriapp.controller.Main", {
        formatter,

        onInit() {
            // SAP logo shipped with the UI5 core library
            this.getView().setModel(new JSONModel({
                logoUrl: sap.ui.require.toUrl("sap/ui/core/mimes/logo/sap_50x26.png")
            }), "view");
        },

        onUpdateFinished(event) {
            const total = event.getParameter("total");
            const bundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.byId("tableTitle").setText(bundle.getText("productsTableTitle", [total]));
        },

        onSearch(event) {
            const query = event.getParameter("newValue");
            const filters = [];
            if (query) {
                filters.push(new Filter({
                    filters: [
                        new Filter("Name", FilterOperator.Contains, query),
                        new Filter("Category", FilterOperator.Contains, query)
                    ],
                    and: false
                }));
            }
            this.byId("productsTable").getBinding("items").filter(filters);
        },

        onItemPress(event) {
            const productId = event.getSource().getBindingContext().getProperty("ProductID");
            this.getOwnerComponent().getRouter().navTo("detail", { productId });
        }
    });
});
