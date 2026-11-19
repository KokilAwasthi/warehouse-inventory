using com.mycompany.warehouse as db from '../db/schema';

@path    : '/odata/v4/inventory'
@requires: 'authenticated-user'
service InventoryService {
    @readonly
    entity Products as projection on db.Products;
}
