import { Controller, Get, Path, Request, Tags } from "tsoa";
import { Request as ExpressRequest } from "express";
import ErrorReturn from "../../../moddels/errorReturn";
import handleError from "../../../utilities/handleError";
import { db } from "../../../db";

@Path("/calc")
export class CalcSetting extends Controller {
    @Get("/settings")
    @Tags("calc")
    public async calcSetting(
        @Request() request: ExpressRequest,
    ): Promise<unknown[]> {
        console.log("hello");
        const err = (error: ErrorReturn) =>
            handleError(this, error, "CalcSetting", request);

        const settings = await db.calcSettings.findMany({
            where: { activeFrom: { lte: new Date() } },
            orderBy: { activeFrom: "desc" },
        });
        return settings;
    }
}
