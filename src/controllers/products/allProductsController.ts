import { Controller, Route, Get } from "tsoa";
import { db } from "../../db";

@Route("/products")
export class AllProducts extends Controller {
    @Get("/all")
    public async allProducts(): Promise<ErrorReturn | Product> {
        const products = await db.product.findMany({
            include: { imageLinks: true },
        });

        console.log(products[0]);

        return {} as Product;
    }
}
import ErrorReturn from "../../moddels/errorReturn";
import Product from "../../moddels/product";
