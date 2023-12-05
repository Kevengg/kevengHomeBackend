import { Controller, Get, Route, Tags, Request } from "tsoa";
import { db } from "../../db";
import handleError from "../../utilities/handleError";
import ErrorReturn from "../../moddels/errorReturn";
import { ImageLink } from "../../moddels/imgLink";
import { Request as ExpressRequest } from "express";

@Route("/images")
export class GetImage extends Controller {
    @Get("/{img}")
    @Tags("get")
    public async getImage(
        img: number,
        @Request() request: ExpressRequest,
    ): Promise<ImageLink | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "getImage", request);

        const imgLink: ImageLink | null = (await db.imageLink.findFirst({
            where: {
                id: {
                    equals: img,
                },
            },
        })) as ImageLink | null;

        if (imgLink !== null) {
            return imgLink;
        }

        return err({
            error: 404,
            errorMsg: "No image with provided id was found",
        });
    }
}
