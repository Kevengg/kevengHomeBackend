import { Body, Controller, Post, Route } from "tsoa";
import { db } from "../../db";
import ErrorReturn from "../../moddels/errorReturn";

interface ProductToImageBoddy {
    ProductID: number;
    ImageID: number;
}
interface ProductToImagesBoddy {
    ProductID: number;
    ImageIDs: number[];
}

@Route("relationship/")
export class AddRealationship extends Controller {
    @Post("product/image/")
    public async productToImage(
        @Body() body: ProductToImageBoddy,
    ): Promise<unknown> {
        // check if a product id was provided
        if (!body.ProductID) {
            const error: ErrorReturn = {
                error: 401,
                errorMsg: "Please provide id of a product to link an image to",
            };
            this.setStatus(error.error);
            return error;
        }

        // check if a link to an image was provided
        if (!body.ImageID) {
            const error: ErrorReturn = {
                error: 401,
                errorMsg:
                    "Please provide the link of a image to link to a product",
            };
            this.setStatus(error.error);
            return error;
        }

        // check if the selected product exists
        const selectedProduct = await db.product.findFirst({
            where: { id: { equals: body.ProductID } },
        });
        if (!selectedProduct) {
            const error: ErrorReturn = {
                error: 404,
                errorMsg: "No product with provided id was found",
            };
            this.setStatus(error.error);
            return error;
        }

        // check if the selected image exists
        const selectedImage = await db.product.findFirst({
            where: { id: { equals: body.ImageID } },
        });
        if (!selectedImage) {
            const error: ErrorReturn = {
                error: 404,
                errorMsg: "No image with provided id was found",
            };
            this.setStatus(error.error);
            return error;
        }

        const dbRetun = await db.product.update({
            where: { id: body.ProductID },
            data: {
                ImageLinks: {
                    connect: { id: body.ImageID },
                },
            },
        });

        return dbRetun;
    }
    @Post("product/images/")
    public async productToImages(
        @Body() body: ProductToImagesBoddy,
    ): Promise<unknown> {
        // check if a product id was provided
        if (!body.ProductID) {
            const error: ErrorReturn = {
                error: 401,
                errorMsg: "Please provide id of a product to link an image to",
            };
            this.setStatus(error.error);
            return error;
        }

        // check if a link to an image was provided
        if (!body.ImageIDs.length) {
            const error: ErrorReturn = {
                error: 401,
                errorMsg:
                    "Please provide atleast one link of an image to link to a product",
            };
            this.setStatus(error.error);
            return error;
        }

        // check if the selected product exists
        const selectedProduct = await db.product.findFirst({
            where: { id: { equals: body.ProductID } },
        });
        if (!selectedProduct) {
            const error: ErrorReturn = {
                error: 404,
                errorMsg: "No product with provided id was found",
            };
            this.setStatus(error.error);
            return error;
        }

        // check if the selected image exists
        const selectedImage = await db.product.findMany({
            where: { id: { in: body.ImageIDs } },
        });
        if (selectedImage.length !== body.ImageIDs.length) {
            const error: ErrorReturn = {
                error: 404,
                errorMsg: "No image with provided id was found",
            };
            this.setStatus(error.error);
            return error;
        }

        // create the array for connect
        const connectArr = body.ImageIDs.reduce(
            (prev, current) => {
                return [...prev, { id: current }];
            },
            [] as { id: number }[],
        );

        const dbRetun = await db.product.update({
            where: { id: body.ProductID },
            data: {
                ImageLinks: {
                    connect: connectArr,
                },
            },
        });

        return dbRetun;
    }
}
