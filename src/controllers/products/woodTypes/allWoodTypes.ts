import { Controller, Get, Query, Route, Tags } from "tsoa";
import { db } from "../../../db";
import { Prisma } from "@prisma/client";

@Route("/woodtypes")
export class AllWoodTypes extends Controller {
    @Get("/all")
    @Tags("get")
    public async allWoodTypes(
        @Query() includeBlanks: boolean = false,
        @Query() includeStains: boolean = false,
    ): Promise<unknown[]> {
        const vars: Prisma.WoodTypeInclude = {
            images: { include: { imageLink: true } },
        };

        if (includeBlanks) {
            vars.woodBlanks = {
                include: { images: { include: { imageLink: true } } },
            };
        }

        if (includeStains) {
            vars.stains = {
                include: { images: { include: { imageLink: true } } },
            };
        }

        const woodTypes = await db.woodType.findMany({
            include: vars,
        });

        return woodTypes;
    }
}
