import { Controller, Get, Route, Tags } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";
import { ImageLink } from "../../moddels/imgLink";

@Route("/images")
export class AllImages extends Controller {
    @Get("/all")
    @Tags("get")
    public async allImages(): Promise<ImageLink[] | ErrorReturn> {
        const images = await db.imageLink.findMany();

        return images as unknown[] as ImageLink[];
    }
}
