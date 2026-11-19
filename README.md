# Warehouse Inventory

A small end-to-end SAP BTP sample:

- **SAPUI5 Fiori app** (freestyle, SAPUI5 1.120, Horizon theme): product list with search and stock status, plus a detail page with product image.
- **SAP CAP service** (Node.js, OData V4): read-only `Products` entity at `/odata/v4/inventory`.
- **SAP HANA Cloud** database (HDI container) in the cloud, SQLite/in-memory locally.
- **MTA deployment** to SAP BTP Cloud Foundry, with a standalone approuter, XSUAA login and the HTML5 Application Repository.

## Architecture

```
Browser ──► Approuter (XSUAA login) ──► HTML5 App Repository (Fiori app)
                     │
                     └── /odata/* ──► CAP service (Node.js) ──► SAP HANA Cloud (HDI)
```

## Project structure

| Path | What it is |
|------|------------|
| `db/schema.cds` | Data model (`com.mycompany.warehouse.Products`) |
| `db/data/*.csv` | Initial product data (6 products), loaded into the DB on deploy |
| `srv/inventory-service.cds` | OData V4 service, requires an authenticated user |
| `app/fioriapp/` | SAPUI5 app (`webapp/`), UI5 Tooling config, route config (`xs-app.json`) |
| `app/router/` | Standalone approuter for Cloud Foundry |
| `mta.yaml` | Multi-target application descriptor (all modules and BTP services) |
| `xs-security.json` | XSUAA security configuration |
| `Fiori-App-Local-to-BTP-Trial.docx` | Step-by-step guide from local run to BTP deployment |

## Run locally

Prerequisites: Node.js 20 or later.

```bash
# 1. Backend: CAP service on http://localhost:4004 (in-memory SQLite, mock login)
npm install
npx cds watch

# 2. Frontend: in a second terminal, UI5 dev server on http://localhost:8080
cd app/fioriapp
npm install
npm start
```

The UI5 dev server forwards `/odata` calls to the CAP service on port 4004, so start the backend first.

## Deploy to SAP BTP (Cloud Foundry)

Prerequisites:

- A BTP subaccount with Cloud Foundry enabled (trial works), and a **SAP HANA Cloud** instance in the target space.
- [Cloud Foundry CLI](https://github.com/cloudfoundry/cli) with the MultiApps plugin: `cf install-plugin multiapps`.
- GNU `make` on your PATH (needed by the MTA build tool; on Windows: `winget install ezwinports.make`).

```bash
cf login -a https://api.cf.<region>.hana.ondemand.com

npm install
npm run build      # mbt build → mta_archives/warehouse-inventory_1.0.0.mtar
npm run deploy     # cf deploy mta_archives/warehouse-inventory_1.0.0.mtar
```

After deployment, open the URL of the `warehouse-inventory` app (shown by `cf apps`) and log in with your BTP user.

The deployment creates these services: HDI container, XSUAA, destination (lite), HTML5 repo app-host and app-runtime.

### Trial account notes

- **HANA Cloud stops every night on trial.** Start it again in SAP HANA Cloud Central, or with `cf update-service <hana-instance> -c '{"data":{"serviceStopped":false}}'`. Otherwise the app gets database errors.
- **The `cf` login token expires** after a few days. Run `cf login` again.
- If a deployment fails, fix the cause and resume it with `cf deploy -i <operation-id> -a retry`.

## Check the data in HANA

In the BTP cockpit, open **SAP HANA Cloud → Actions → Open in SAP HANA Database Explorer**. Add the HDI container `warehouse-inventory-db` and open the table `COM_MYCOMPANY_WAREHOUSE_PRODUCTS`.
