import { Controller, Get, Route } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";
import ImageLink from "../../moddels/imgLink";

@Route("/images")
export class AllImages extends Controller {
    @Get("/all")
    public async allImages(): Promise<ImageLink[] | ErrorReturn> {
        const images = await db.imageLink.findMany();

        return images as unknown[] as ImageLink[];
    }
}
