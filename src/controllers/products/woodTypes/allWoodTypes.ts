import { Controller, Get, Route, Tags } from "tsoa";
import { db } from "../../../db";

@Route("/woodtypes")
export class AllWoodTypes extends Controller {
    @Get("/all")
    @Tags("get")
    public async allWoodTypes(): Promise<unknown[]> {
        const woodTypes = await db.woodType.findMany({
            include: { images: { include: { imageLink: true } } },
        });

        return woodTypes;
    }
}
