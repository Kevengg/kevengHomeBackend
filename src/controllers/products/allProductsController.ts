import { Controller, Route, Get, Tags } from "tsoa";
import { db } from "../../db";
import ErrorReturn from "../../moddels/errorReturn";
import Product from "../../moddels/product";

@Route("/products")
export class AllProducts extends Controller {
    @Get("/all")
    @Tags("get")
    public async allProducts(): Promise<Product[] | ErrorReturn> {
        const products = await db.product.findMany({
            include: { ImageLinks: { include: { imageLink: true } } },
        });

        return products as unknown[] as Product[];
    }
}
