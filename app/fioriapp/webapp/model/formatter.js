sap.ui.define([], () => {
    "use strict";

    // OData V4 hands formatters the type-formatted value (e.g. "0" or "1,250"), so normalise to a number.
    // Returns null while the value is still loading.
    function toNumber(stock) {
        if (stock === null || stock === undefined || stock === "") {
            return null;
        }
        return typeof stock === "number" ? stock : Number(String(stock).replace(/[^\d.-]/g, ""));
    }

    function stockLevel(stock) {
        const n = toNumber(stock);
        if (n === null || Number.isNaN(n)) {
            return null;
        }
        if (n <= 0) {
            return "out";
        }
        return n < 5 ? "low" : "in";
    }

    return {
        stockState(stock) {
            return { out: "Error", low: "Warning", in: "Success" }[stockLevel(stock)] || "None";
        },

        // Resolves an app-relative path (e.g. "images/HT-1000.svg") so it also works inside the launchpad
        imageUrl(path) {
            return path ? sap.ui.require.toUrl("com/mycompany/fioriapp/" + path) : "";
        },

        // Called with the controller as "this"
        stockText(stock) {
            const key = { out: "outOfStock", low: "lowStock", in: "inStock" }[stockLevel(stock)];
            return key ? this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(key) : "";
        }
    };
});
