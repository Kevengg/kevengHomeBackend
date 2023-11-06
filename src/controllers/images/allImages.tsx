import { ImageLink } from "@prisma/client";
import { Controller, Get, Route } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";

@Route("/images")
export class AllImages extends Controller {
    @Get("/all")
    public async allImages(): Promise<ImageLink[] | ErrorReturn> {
        const images = await db.imageLink.findMany();

        return images;
    }
}
