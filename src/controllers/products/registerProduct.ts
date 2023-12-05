import { Body, Controller, Post, Route, Tags, Request } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";
import { Request as ExpressRequest } from "express";
import handleError from "../../utilities/handleError";

interface RegisterProductBody {
    name: string;
    description: string;
    price?: number;
    listPrice?: number;
    soldPrice?: number;
    sold: boolean;
    soldAt?: Date;
    activeFrom?: Date | any;
    priceBreakdown?: string;
    images?: number[];
}
interface RegisterProductBodyNotImages {
    name: string;
    description: string;
    price?: number;
    listPrice?: number;
    soldPrice?: number;
    sold: boolean;
    soldAt?: Date;
    activeFrom?: Date;
    priceBreakdown?: string;
}

@Route("/post")
export class RegisterProduct extends Controller {
    @Post("/product")
    @Tags("register")
    public async register(
        @Body() body: RegisterProductBody,
        @Request() request: ExpressRequest,
    ): Promise<unknown | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "RegisterProduct", request);
        if (!body.name) {
            return err({
                error: 400,
                errorMsg: "Please provide the name of the product",
            });
        }

        if (!body.description) {
            return err({
                error: 400,
                errorMsg: "Please provide a description of the product",
            });
        }

        // check if the selected image exists
        const selectedImages = await db.imageLink.findMany({
            where: { id: { in: body.images } },
        });

        if (body.images && selectedImages.length !== body.images.length) {
            return err({
                error: 404,
                errorMsg: "One or more of the provided image id's do not exist",
            });
        }

        // create the array for connect
        const connectArr = body.images?.reduce(
            (prev, current) => {
                return [...prev, { imageLinkId: current }];
            },
            [] as { imageLinkId: number }[],
        );

        const moddedData: RegisterProductBodyNotImages = {
            name: body.name,
            description: body.description,
            price: body.price,
            listPrice: body.listPrice,
            soldPrice: body.soldPrice,
            sold: body.sold,
            soldAt: body.soldAt,
            activeFrom: body.activeFrom,
            priceBreakdown: body.priceBreakdown,
        };

        const dbRetun = await db.product.create({
            data: {
                ...moddedData,
                activeFrom: body.activeFrom && body.activeFrom,
                ImageLinks: { connect: connectArr },
            },
        });

        return dbRetun;
        // this.setStatus(400);
        // return "error";
    }
}
