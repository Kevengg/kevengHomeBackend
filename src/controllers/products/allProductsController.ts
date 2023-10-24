import { Controller, Route, Get } from "tsoa";
import { db } from "../../db";

@Route("/products")
export class AllProducts extends Controller {
    @Get("/all")
    public async allProducts(): Promise<Product[] | ErrorReturn> {
        const products = await db.product.findMany({
            include: { imageLinks: true },
        });

        console.log(products[0]);

        return products;
    }
}
import ErrorReturn from "../../moddels/errorReturn";
import Product from "../../moddels/product";
