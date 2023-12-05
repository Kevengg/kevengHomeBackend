import { Controller, Get, Route, Tags, Request } from "tsoa";
import { db } from "../../../db";
import handleError from "../../../utilities/handleError";
import ErrorReturn from "../../../moddels/errorReturn";
import { Request as ExpressRequest } from "express";

@Route("errors/known")
export class GetKnownErrors extends Controller {
    @Get("/count")
    @Tags("health check")
    public async knownErrorCount(): Promise<{ count: number }> {
        const count = await db.knownErrors.count();
        return { count: count };
    }

    @Get("/{page}")
    @Tags("health check")
    public async getKnownErrors(
        page: number,
        @Request() request: ExpressRequest,
    ): Promise<unknown | ErrorReturn> {
        const err = (error: ErrorReturn) =>
            handleError(this, error, "getKnownErrors", request);

        const errors = await db.knownErrors.findMany({
            skip: 1000 * page,
            take: 1000,
        });

        if (!errors.length) {
            return err({
                error: 404,
                errorMsg: "No errors were found in selected page",
            });
        }

        return errors;
    }
}
