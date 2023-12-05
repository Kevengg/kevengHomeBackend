import { Body, Controller, Request, Put, Route, Tags } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";
import { Product } from "@prisma/client";
import handleError from "../../utilities/handleError";
import { Request as ExpressRequest } from "express";

interface IEditProduct {
    ProductID: number;
    name?: string;
    description?: string;
    price?: number;
    listPrice?: number;
    activeFrom?: Date | null;
    deleted?: boolean;
}
interface ProductEditResponse {
    before: Product;
    after: Product;
}

@Route("edit/")
@Tags("edit products")
export class EditProduct extends Controller {
    @Put("product")
    public async EditProduct(
        @Body() body: IEditProduct,
        @Request() request: ExpressRequest,
    ): Promise<ProductEditResponse | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "EditProduct", request);

        if (Object.values(body).length === 1) {
            return err({
                error: 400,
                errorMsg: "Please provide at least one thing to edit",
            });
        }

        if (!body.ProductID) {
            return err({
                error: 400,
                errorMsg: "Please provide an id",
            });
        }

        // check if the selected product exists
        const selectedProduct: Product = (await db.product.findFirst({
            where: { id: { equals: body.ProductID } },
        })) as Product;
        if (!selectedProduct) {
            return err({
                error: 404,
                errorMsg: "No product with provided id was found",
            });
        }

        const moddedData = {
            name: body.name,
            description: body.description,
            price: body.price,
            listPrice: body.listPrice,
            activeFrom: body.activeFrom,
            deleted: body.deleted,
        };

        const editedProduct: Product = await db.product.update({
            where: { id: body.ProductID },
            data: {
                ...moddedData,
            },
        });

        if (editedProduct.id) {
            return {
                before: selectedProduct,
                after: editedProduct,
            };
        }

        return err({
            error: 400,
            errorMsg: "Something went wrong",
        });
    }
}
