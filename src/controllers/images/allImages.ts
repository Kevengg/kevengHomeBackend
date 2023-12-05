import { Controller, Get, Route, Tags } from "tsoa";
import { db } from "../../db";
import { ImageLink } from "../../moddels/imgLink";

@Route("/images")
export class AllImages extends Controller {
    @Get("/all")
    @Tags("get")
    public async allImages(): Promise<ImageLink[]> {
        const images = await db.imageLink.findMany();

        return images as unknown[] as ImageLink[];
    }
}
