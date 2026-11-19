namespace com.mycompany.warehouse;

entity Products {
    key ProductID   : String(10);
        Name        : String(100);
        Category    : String(50);
        Price       : Decimal(15, 2);
        Currency    : String(3);
        Stock       : Integer;
        Description : String(500);
        ImageUrl    : String(255);
}
