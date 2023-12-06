import { Body, Controller, Put, Route, Tags, Request, Query } from "tsoa";
import { db } from "../../db";
import ErrorReturn from "../../moddels/errorReturn";
import { Request as ExpressRequest } from "express";
import handleError from "../../utilities/handleError";

interface ProductToImageBoddy {
    ProductID: number;
    ImageID: number;
}
interface ProductToImagesBoddy {
    ProductID: number;
    ImageIDs: number[];
}

@Route("edit/")
export class AddRealationship extends Controller {
    @Put("product/image/")
    @Tags("edit products")
    public async productToImage(
        @Body() body: ProductToImageBoddy,
        @Request() request: ExpressRequest,
    ): Promise<{ statusbar: "success" } | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "productToImage", request);

        // check if a product id was provided
        if (!body.ProductID) {
            return err({
                error: 401,
                errorMsg: "Please provide id of a product to link an image to",
            });
        }

        // check if a link to an image was provided
        if (!body.ImageID) {
            return err({
                error: 401,
                errorMsg:
                    "Please provide the link of a image to link to a product",
            });
        }

        // check if the selected product exists
        const selectedProduct = await db.product.findFirst({
            where: { id: { equals: body.ProductID } },
        });
        if (!selectedProduct) {
            return err({
                error: 404,
                errorMsg: "No product with provided id was found",
            });
        }

        // check if the selected image exists
        const selectedImage = await db.imageLinkConnection.findFirst({
            where: { imageLinkId: { equals: body.ImageID } },
        });
        if (!selectedImage) {
            return err({
                error: 404,
                errorMsg: "No image with provided id was found",
            });
        }

        const dbRetun = await db.product.update({
            where: { id: body.ProductID },
            data: {
                ImageLinks: {
                    connect: { imageLinkId: body.ImageID },
                },
            },
        });

        if (dbRetun.id === body.ProductID) {
            return { statusbar: "success" };
        } else {
            return err({
                error: 400,
                errorMsg: "Something whent wrong",
            });
        }
    }
    @Put("product/images/")
    @Tags("edit products")
    public async productToImages(
        @Body() body: ProductToImagesBoddy,
        @Query() remove: boolean = false,
        @Request() request: ExpressRequest,
    ): Promise<{ statusbar: "success" } | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "productToImages", request);

        // check if a product id was provided
        if (!body.ProductID) {
            return err({
                error: 401,
                errorMsg: "Please provide id of a product to link an image to",
            });
        }

        // check if a link to an image was provided
        if (!body.ImageIDs.length) {
            return err({
                error: 401,
                errorMsg:
                    "Please provide atleast one link of an image to link to a product",
            });
        }

        // check if the selected product exists
        const selectedProduct = await db.product.findFirst({
            where: { id: { equals: body.ProductID } },
            include: { ImageLinks: true },
        });
        if (!selectedProduct) {
            return err({
                error: 404,
                errorMsg: "No product with provided id was found",
            });
        }

        // check if the selected image exists
        const selectedImages = await db.imageLinkConnection.findMany({
            where: { imageLinkId: { in: body.ImageIDs } },
        });

        if (selectedImages.length !== body.ImageIDs.length) {
            return err({
                error: 404,
                errorMsg: "No image with provided id was found",
            });
        }

        if (remove) {
            // check if the selected image is linked to the selected product
            const areInProduct = selectedProduct.ImageLinks.map((image) =>
                body.ImageIDs.includes(image.imageLinkId),
            ).reduce((prew, current) => {
                return current ? [...prew, current] : prew;
            }, [] as boolean[]);

            if (areInProduct.length !== body.ImageIDs.length) {
                return err({
                    error: 404,
                    errorMsg:
                        "One or more if the provided images do not exist on the product",
                });
            }

            // create the array for disconnect
            const connectArr = body.ImageIDs.reduce(
                (prev, current) => {
                    return [...prev, { imageLinkId: current }];
                },
                [] as { imageLinkId: number }[],
            );

            const dbRetun = await db.product.update({
                where: { id: body.ProductID },
                data: {
                    ImageLinks: {
                        disconnect: connectArr,
                    },
                },
            });

            if (dbRetun.id === body.ProductID) {
                return { statusbar: "success" };
            } else {
                return err({
                    error: 400,
                    errorMsg: "Something whent wrong",
                });
            }
        }

        // create the array for connect
        const connectArr = body.ImageIDs.reduce(
            (prev, current) => {
                return [...prev, { imageLinkId: current }];
            },
            [] as { imageLinkId: number }[],
        );

        const dbRetun = await db.product.update({
            where: { id: body.ProductID },
            data: {
                ImageLinks: {
                    connect: connectArr,
                },
            },
        });

        if (dbRetun.id === body.ProductID) {
            return { statusbar: "success" };
        } else {
            return err({
                error: 400,
                errorMsg: "Something whent wrong",
            });
        }
    }
}
