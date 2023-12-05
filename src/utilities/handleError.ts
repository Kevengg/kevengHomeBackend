import { Controller } from "tsoa";
import { db } from "../db";
import { Request as ExpressRequest } from "express";
import ErrorReturn from "../moddels/errorReturn";

export default async function handleError(
    target: any,
    error: ErrorReturn,
    sorce: string,
    request: ExpressRequest,
): Promise<ErrorReturn> {
    target.setStatus(error.error);

    const dbRetun = await db.knownErrors.create({
        data: {
            status: error.error,
            message: error.errorMsg || "",
            sorce: request.url || "",
            host: request.headers.host || "",
            connection: request.headers.connection || "",
            useragent: request.headers["user-agent"] || "",
            referer: request.headers.referer || "",
        },
    });

    return error;
}
